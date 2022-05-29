import Link from 'next/link'

export default function NavLinks() {
    return (
        <div className="navlinks__container_div">
            <Link href="/oldIndex">
                Old Index
            </Link>
        </div>
    )
}