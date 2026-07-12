'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Leaf, Mail, Lock, User, Building2, ArrowRight } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<'personal' | 'company'>('personal')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companySize: '',
    industry: '',
    country: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validatePersonalStep = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim())
      newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateCompanyStep = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyName.trim())
      newErrors.companyName = 'Company name is required'
    if (!formData.companySize)
      newErrors.companySize = 'Company size is required'
    if (!formData.industry) newErrors.industry = 'Industry is required'
    if (!formData.country) newErrors.country = 'Country is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePersonalStep()) {
      setStep('company')
    }
  }

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateCompanyStep()) {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        localStorage.setItem('auth_token', 'demo_token_' + Date.now())
        router.push('/dashboard')
      } catch (error) {
        console.error('Signup error:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Save auth token and redirect
      localStorage.setItem('auth_token', 'demo_token_' + Date.now())
      router.push('/dashboard')
    } catch (error) {
      console.error('Signup error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#16a34a]/10 via-background to-[#2563eb]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#16a34a] flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              EcoSphere
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Join EcoSphere
          </h1>
          <p className="text-muted-foreground">
            Start measuring and improving your ESG performance
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center gap-8 mb-8">
          {['Personal', 'Company'].map((label, idx) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step === ['personal', 'company'][idx]
                    ? 'bg-[#16a34a] text-white'
                    : step === 'company' && idx === 0
                      ? 'bg-green-100 text-[#16a34a]'
                      : 'bg-muted text-muted-foreground'
                  }`}
              >
                {idx + 1}
              </div>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle>
              {step === 'personal'
                ? 'Create Your Account'
                : step === 'company'
                  ? 'Company Information'
                  : 'Verify Your Email'}
            </CardTitle>
            <CardDescription>
              {step === 'personal'
                ? 'Enter your personal details to get started'
                : step === 'company'
                  ? 'Tell us about your organization'
                  : 'Verify your email to complete signup'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'personal' && (
              <form onSubmit={handlePersonalSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={
                        errors.firstName ? 'border-red-500' : ''
                      }
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={
                      errors.confirmPassword ? 'border-red-500' : ''
                    }
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            )}

            {step === 'company' && (
              <form onSubmit={handleCompanySubmit} className="flex flex-col gap-4">
                <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-1">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="Acme Corp"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={
                        errors.companyName ? 'border-red-500' : ''
                      }
                    />
                    {errors.companyName && (
                      <p className="text-xs text-red-500">
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className={`w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:ring-offset-2 ${errors.companySize ? 'border-red-500' : ''
                        }`}
                    >
                      <option value="">Select company size</option>
                      <option value="1-50">1-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1001-5000">1001-5000 employees</option>
                      <option value="5000+">5000+ employees</option>
                    </select>
                    {errors.companySize && (
                      <p className="text-xs text-red-500">
                        {errors.companySize}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className={`w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:ring-offset-2 ${errors.industry ? 'border-red-500' : ''
                        }`}
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="energy">Energy</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="retail">Retail</option>
                      <option value="transportation">Transportation</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry && (
                      <p className="text-xs text-red-500">{errors.industry}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:ring-offset-2 ${errors.country ? 'border-red-500' : ''
                        }`}
                    >
                      <option value="">Select country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="IN">India</option>
                      <option value="CN">China</option>
                    </select>
                    {errors.country && (
                      <p className="text-xs text-red-500">{errors.country}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    type="submit"
                    className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setStep('personal')}
                  >
                    Back
                  </Button>
                </div>
              </form>
            )}

          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#16a34a] hover:text-[#15803d] font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div >
  )
}
