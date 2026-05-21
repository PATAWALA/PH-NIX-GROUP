import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

interface Step {
  id: number
  title: string
  icon: LucideIcon
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const StepIcon = step.icon
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                  isCompleted && 'bg-amber-600 text-white',
                  isCurrent && 'bg-amber-100 text-amber-700 ring-2 ring-amber-600 ring-offset-2',
                  !isCompleted && !isCurrent && 'bg-stone-200 text-stone-400'
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <StepIcon className="h-5 w-5" />
                )}
              </div>
              <span
                className={cn(
                  'text-xs font-medium mt-2 hidden sm:block',
                  (isCompleted || isCurrent) ? 'text-amber-700' : 'text-stone-400'
                )}
              >
                {step.title}
              </span>
            </div>
          )
        })}
      </div>
      
      {/* Progress bar */}
      <div className="absolute top-5 left-0 right-0 h-0.5 -z-0">
        <div className="absolute inset-0 bg-stone-200" />
        <div
          className="absolute inset-y-0 left-0 bg-amber-600 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}