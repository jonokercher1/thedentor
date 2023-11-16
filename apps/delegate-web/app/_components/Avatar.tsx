import { type FC } from 'react'

interface AvatarProps { }

// TODO: generate this from the users name
const Avatar: FC<AvatarProps> = () => {
  return (
    <div className="h-14 w-14 flex items-center justify-center rounded-full border-2 border-accent-primary">
      {/* TODO: generate this from the current logged in user */}
      <div className="h-12 w-12 bg-white rounded-full" />
    </div>
  )
}

export default Avatar