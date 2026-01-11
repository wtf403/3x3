// Next.js中间件 - 处理API请求、CORS、限流等
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 请求频率限制配置
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1分钟
const RATE_LIMIT_MAX_REQUESTS = 100 // 每分钟最多100次请求

// IP白名单（开发环境）
const DEV_WHITELIST = ['127.0.0.1', '::1', 'localhost']

/**
 * 检查请求频率限制
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const key = `rate_limit_${ip}`
  
  const existing = rateLimitMap.get(key)
  
  if (!existing) {
    rateLimitMap.set(key, { count: 1, timestamp: now })
    return true
  }
  
  // 检查时间窗口
  if (now - existing.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(key, { count: 1, timestamp: now })
    return true
  }
  
  // 检查请求次数
  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }
  
  existing.count++
  return true
}

/**
 * 清理过期的频率限制记录
 */
function cleanupRateLimit() {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(key)
    }
  }
}

// 定期清理过期记录
setInterval(cleanupRateLimit, RATE_LIMIT_WINDOW)

/**
 * 获取客户端IP地址
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return request.ip || '127.0.0.1'
}

/**
 * 中间件主函数
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const clientIP = getClientIP(request)
  
  // 只对API路由应用中间件
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    
    // 设置CORS头
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    response.headers.set('Access-Control-Max-Age', '86400')
    
    // 处理预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: response.headers })
    }
    
    // 开发环境跳过频率限制
    const isDev = process.env.NODE_ENV === 'development'
    if (isDev && DEV_WHITELIST.some(ip => clientIP.includes(ip))) {
      return response
    }
    
    // 检查频率限制
    if (!checkRateLimit(clientIP)) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'Rate limit exceeded. Please try again later.',
          timestamp: new Date().toISOString()
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
            ...Object.fromEntries(response.headers.entries())
          }
        }
      )
    }
    
    // 添加安全头
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    // 添加API版本头
    response.headers.set('X-API-Version', '1.0.0')
    
    // 添加请求ID用于调试
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    response.headers.set('X-Request-ID', requestId)
    
    return response
  }
  
  // 非API请求直接通过
  return NextResponse.next()
}

// 配置中间件匹配规则
export const config = {
  matcher: [
    // 匹配所有API路由
    '/api/:path*',
    // 排除静态文件和资源
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}