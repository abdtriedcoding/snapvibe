import Link from 'next/link'
import SearchBar from './_components/searchbar'
import { Button } from '@/components/ui/button'
import { getUsers } from '@/app/actions/getUsers'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>
}) {
  const { search_query } = searchParams

  const data = await getUsers()
  const users = data.filter((user) =>
    user.name?.toLowerCase().includes(search_query?.toLowerCase() ?? '')
  )

  return (
    <div className="mx-auto min-h-[calc(100vh-48px-36px-16px-32px)] max-w-xl space-y-4">
      <h1 className="text-xl font-semibold">Suggested for you</h1>
      <SearchBar />
      <div className="space-y-4 pt-6">
        {users.map((user, i) => (
          <User
            key={i}
            name={user.name}
            image={user.image}
            username={user.username!}
          />
        ))}
      </div>
    </div>
  )
}

function User({
  name,
  image,
  username,
}: {
  name: string | null
  image: string | null
  username: string
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={image ?? '/default-userimage.jpg'} alt="Avatar" />
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold">{name}</h2>
            <p className="text-xs text-zinc-300">{username}</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/${username}`}>See Profile</Link>
        </Button>
      </div>
    </>
  )
}
