import Link from "next/link";
import { Layout } from "../components/Layout";

export default function terms() {
  return (
<Layout>
  <div className="m-4 mb-24">
        <h1 className="font-bold text-4xl mb-6">Terms and Conditions of Use</h1>

        <h2 className="text-xl font-semibold">1. Terms</h2>

        <p className="py-4">By accessing this Website, accessible from https://listen.unitedpursuit.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>

        <h2 className="text-xl font-semibold">2. Use License</h2>

        <p className="py-4">Permission is granted to temporarily download one copy of the materials on United Pursuit Creative, LLC&apos;s Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>

        <ul className="pb-4 pl-7 list-disc">
          <li>modify or copy the materials;</li>
          <li>use the materials for any commercial purpose or for any public display;</li>
          <li>attempt to reverse engineer any software contained on United Pursuit Creative, LLC&apos;s Website;</li>
          <li>remove any copyright or other proprietary notations from the materials; or</li>
          <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
        </ul>

        <p className="py-4">This will let United Pursuit Creative, LLC to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.</p>

        <h2 className="text-xl font-semibold">3. Disclaimer</h2>

        <p className="py-4">All the materials on United Pursuit Creative, LLC&apos;s Website are provided "as is". United Pursuit Creative, LLC makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, United Pursuit Creative, LLC does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>

        <h2 className="text-xl font-semibold">4. Limitations</h2>

        <p className="py-4">United Pursuit Creative, LLC or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on United Pursuit Creative, LLC&apos;s Website, even if United Pursuit Creative, LLC or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</p>

        <h2 className="text-xl font-semibold">5. Revisions and Errata</h2>

        <p className="py-4">The materials appearing on United Pursuit Creative, LLC&apos;s Website may include technical, typographical, or photographic errors. United Pursuit Creative, LLC will not promise that any of the materials in this Website are accurate, complete, or current. United Pursuit Creative, LLC may change the materials contained on its Website at any time without notice. United Pursuit Creative, LLC does not make any commitment to update the materials.</p>

        <h2 className="text-xl font-semibold">6. Links</h2>

        <p className="py-4">United Pursuit Creative, LLC has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by United Pursuit Creative, LLC of the site. The use of any linked website is at the user&apos;s own risk.</p>

        <h2 className="text-xl font-semibold">7. Site Terms of Use Modifications</h2>

        <p className="py-4">United Pursuit Creative, LLC may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</p>

        <h2 className="text-xl font-semibold">8. Your Privacy</h2>

        <p className="py-4">Please read our <Link href="/privacy"><a className="link">Privacy Policy</a></Link>.</p>

        <h2 className="text-xl font-semibold">9. Governing Law</h2>

        <p className="py-4">Any claim related to United Pursuit Creative, LLC&apos;s Website shall be governed by the laws of us without regards to its conflict of law provisions.</p>
  </div>
</Layout>
  )
}
