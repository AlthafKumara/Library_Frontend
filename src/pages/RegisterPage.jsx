import { motion } from 'framer-motion'
import { EnvelopeSimple } from '@phosphor-icons/react'
import { Input } from '../components/ui/Input'
import { PasswordInput } from '../components/ui/PasswordInput'
import { Button } from '../components/ui/Button'
import Logo from '../assets/images/Logo.png'
import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import { useAuth } from '../hooks/useAuth'

export default function RegisterPage() {
  const {
    registerFields,
    registerErrors,
    registerLoading,
    registerServerError,
    onRegisterChange,
    handleRegister,
  } = useAuth()

  return (
    <div className="flex min-h-dvh w-full bg-neutral-200 text-neutral-900">

      {/* Left Panel — Brand (desktop only) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-neutral-900 p-12 lg:flex">
        <div className="absolute inset-0 z-0 bg-linear-to-br from-primary-500/20 to-transparent opacity-50 mix-blend-overlay" />

        <div className="relative z-10 flex items-center gap-3">
          <img src={Logo} alt="Library Logo" className="h-10 w-auto object-contain" />
          <span className="text-xl font-medium tracking-tight text-white">Library System</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="mb-6 text-4xl font-medium tracking-tighter text-white leading-tight">
            Knowledge is a journey. <br /> Start yours here.
          </h2>
          <p className="text-lg text-neutral-400">
            Access thousands of books, academic journals, and multimedia resources curated just for you.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
          className="mx-auto w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="mb-10 flex items-center justify-center lg:hidden">
            <img src={Logo} alt="Library Logo" className="h-12 w-auto object-contain" />
          </div>

          <div className="mb-8">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-neutral-900 text-center">
              Join Us Today!
            </h1>
            <p className="text-base text-neutral-500 leading-relaxed text-center">
              Create your account to unlock access to thousands of interesting books.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-4xl border border-neutral-300 bg-white p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] sm:p-10">
            <form className="flex flex-col gap-6" onSubmit={handleRegister} noValidate>

              {/* Server-level error banner */}
              {registerServerError && (
                <div className="rounded-xl border border-danger-500/30 bg-danger-500/10 px-4 py-3 text-sm text-danger-600">
                  {registerServerError}
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={registerFields.email}
                  onChange={onRegisterChange}
                  error={registerErrors.email}
                  className="pl-11"
                  autoComplete="email"
                />
                <EnvelopeSimple
                  size={20}
                  className="absolute left-4 top-9.5 text-neutral-400 pointer-events-none"
                  weight="regular"
                />
              </div>

              {/* Password */}
              <PasswordInput
                label="Password"
                name="password"
                placeholder="••••••••"
                value={registerFields.password}
                onChange={onRegisterChange}
                error={registerErrors.password}
                autoComplete="new-password"
              />

              {/* Confirm Password */}
              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                placeholder="••••••••"
                value={registerFields.confirmPassword}
                onChange={onRegisterChange}
                error={registerErrors.confirmPassword}
                autoComplete="new-password"
              />

              <div className="pt-2">
                <Button
                  variant="primary"
                  type="submit"
                  className="w-full text-base font-medium"
                  disabled={registerLoading}
                >
                  {registerLoading ? 'Creating account…' : 'Register'}
                </Button>
              </div>
            </form>

            {/* Footer links */}
            <div className="mt-8 flex flex-col items-center gap-3 text-sm">
              <div className="text-neutral-500 text-center">
                Already have an account?{' '}
                <Link
                  to={ROUTES.LOGIN}
                  className="font-medium text-primary-500 transition-colors hover:text-primary-600"
                >
                  Login here
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}