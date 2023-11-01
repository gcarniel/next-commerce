import { SignUp } from '@clerk/nextjs'

interface SignUpPageProps {
  searchParams?: {
    redirectUrl: string
  }
}
export default function SignUpPage({ searchParams }: SignUpPageProps) {
  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center ">
          <SignUp
            signInUrl="/sign-in"
            redirectUrl={searchParams?.redirectUrl}
          />
        </div>
      </div>
    </section>
  )
}
