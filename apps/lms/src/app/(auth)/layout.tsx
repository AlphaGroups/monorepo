export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-W flex items-center justify-center bg-gray-50">
      <div className="w-full ">
        {children}
      </div>
    </div>
  )
}