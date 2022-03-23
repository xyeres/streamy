import Link from "next/link";

export default function FooterLine() {
  return (
    <p className="text-xs mx-10 text-center">
      By signing in you agree to our <Link href="/terms"><a className="link">terms of service</a></Link> and <Link href="/privacy"><a className="link">privacy policy</a></Link>.
    </p>
  )
}
