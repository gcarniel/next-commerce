import { SignIn } from '@clerk/nextjs'

interface SignInPageProps {
  searchParams?: {
    redirectUrl: string
  }
}
export default function SignInPage({ searchParams }: SignInPageProps) {
  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center ">
          <SignIn
            signUpUrl="/sign-up"
            redirectUrl={searchParams?.redirectUrl}
          />
        </div>
      </div>
    </section>
  )
}
