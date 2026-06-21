import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RiseLogo } from '@/components/RiseLogo'
import { Eye, EyeOff, ArrowUpRight, Zap, Target, TrendingUp } from 'lucide-react'

export function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const result = await signIn(email, password)
    if (result.error) {
      setError(result.error)
    } else {
      navigate('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen w-full bg-[#0a0a0a]">
      {/* LEFT SIDE — Visual & Branding */}
      <div className="relative hidden lg:flex lg:w-[55%] xl:w-[60%] flex-col justify-between overflow-hidden">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Animated gradient orbs */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #d4a017 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #e8b923 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #f0c040 0%, transparent 70%)',
            animation: 'float 12s ease-in-out infinite 2s'
          }}
        />

        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(212, 160, 23, 0.5) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(212, 160, 23, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-12 xl:p-16">
          {/* Top — Logo area */}
          <div
            className={`flex items-center gap-3 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            <RiseLogo className="w-10 h-10" />
            <span className="text-white/90 font-bold text-lg tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>
              RISE AI
            </span>
          </div>

          {/* Middle — Hero text */}
          <div className="flex-1 flex flex-col justify-center -mt-8">
            <div 
              className={`transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-[1px] w-12 bg-gradient-to-r from-[#d4a017] to-transparent" />
                <span 
                  className="text-[#d4a017] text-sm tracking-[0.3em] uppercase font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Admin Portal
                </span>
              </div>

              <h1 
                className="text-white leading-[0.9] tracking-tight"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                <span className="block text-[6rem] xl:text-[8rem] font-bold">RISE</span>
                <span className="block text-[6rem] xl:text-[8rem] font-bold bg-gradient-to-r from-[#d4a017] via-[#e8b923] to-[#f0d040] bg-clip-text text-transparent">
                  AI
                </span>
              </h1>

              <p 
                className="mt-8 text-white/50 text-xl xl:text-2xl italic max-w-md leading-relaxed"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                "Elevate your performance. Transform ambition into achievement through the power of intelligent goal-setting."
              </p>
            </div>

            {/* Stats / Feature pills */}
            <div 
              className={`flex flex-wrap gap-4 mt-12 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {[
                { icon: Target, label: 'Goal Tracking' },
                { icon: TrendingUp, label: 'Performance AI' },
                { icon: Zap, label: 'Smart Insights' }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <item.icon className="w-4 h-4 text-[#d4a017]" />
                  <span className="text-white/70 text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom — Decorative athlete silhouette */}
          <div 
            className={`transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="relative h-48 w-full">
              {/* Abstract mountain/peak shapes suggesting ascent */}
              <svg 
                viewBox="0 0 400 120" 
                className="absolute bottom-0 left-0 w-full h-full opacity-20"
                preserveAspectRatio="xMidYMax meet"
              >
                <defs>
                  <linearGradient id="peakGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#d4a017" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#d4a017" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M0 120 L80 40 L140 80 L200 20 L260 70 L320 30 L400 120 Z" 
                  fill="url(#peakGrad)"
                />
                <path 
                  d="M0 120 L100 60 L160 90 L220 50 L280 80 L340 45 L400 120 Z" 
                  fill="url(#peakGrad)"
                  opacity="0.5"
                />
              </svg>

              {/* Running figure silhouette */}
              <svg 
                viewBox="0 0 200 200" 
                className="absolute bottom-4 right-8 w-32 h-32 xl:w-40 xl:h-40 opacity-30"
              >
                <path 
                  d="M85 20 C85 12 92 5 100 5 C108 5 115 12 115 20 C115 28 108 35 100 35 C92 35 85 28 85 20 Z
                     M100 40 L110 45 L125 60 L140 55 L145 60 L130 70 L115 80 L110 95 L115 110 L125 125 L130 140
                     L125 160 L115 165 L110 155 L115 140 L110 125 L100 115 L90 125 L80 140 L70 155 L60 160
                     L55 150 L65 135 L75 120 L85 105 L90 90 L85 75 L75 65 L60 70 L45 65 L40 55 L50 45
                     L65 50 L80 55 L90 50 Z"
                  fill="#d4a017"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — Login Form */}
      <div className="flex-1 flex items-center justify-center relative bg-white">
        {/* Subtle background texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div 
          className={`relative z-10 w-full max-w-sm px-8 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Mobile logo — only shows on small screens */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <RiseLogo className="w-10 h-10" />
            <span className="text-[#0a0a0a] font-bold text-xl tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>
              RISE AI
            </span>
          </div>

          <div className="mb-10">
            <h2 
              className="text-[#0a0a0a] text-3xl font-bold mb-2"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Sign in to access your admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label
                className="text-xs font-semibold text-gray-700 uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="admin@riseai.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-gray-50 border-gray-200 text-[#0a0a0a] placeholder:text-gray-400 focus:border-[#d4a017] focus:ring-[#d4a017]/20 rounded-xl transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label
                className="text-xs font-semibold text-gray-700 uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-gray-50 border-gray-200 text-[#0a0a0a] placeholder:text-gray-400 focus:border-[#d4a017] focus:ring-[#d4a017]/20 rounded-xl pr-14 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-[#d4a017] focus:ring-[#d4a017]/20 cursor-pointer"
                />
                <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Remember me
                </span>
              </label>
              <button 
                type="button"
                className="text-sm text-[#d4a017] hover:text-[#b8941f] font-medium transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-black/20 group"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? 'Signing in...' : 'Sign In'}
                {!loading && <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
              </span>
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100">
            <p className="text-center text-gray-400 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
              Protected by enterprise-grade security. <br />
              Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
      `}</style>
    </div>
  )
}
