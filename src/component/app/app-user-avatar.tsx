import { Avatar, type AvatarProps } from '@mui/material'
import type { User } from 'types/model'

type AppUserAvatarProps = Omit<AvatarProps, 'alt' | 'src'> & {
  user : User
  size?: number
}

const palette = [
  { bg: '#102A43', mid: '#1D4ED8', accent: '#F9E400', skin: '#D6A579', hair: '#171923' },
  { bg: '#172554', mid: '#0E7490', accent: '#B3FF00', skin: '#C6865C', hair: '#1F2937' },
  { bg: '#1F2937', mid: '#475569', accent: '#38BDF8', skin: '#E0AC69', hair: '#111827' },
  { bg: '#052E2B', mid: '#0F766E', accent: '#F59E0B', skin: '#F1C27D', hair: '#2F1B12' },
  { bg: '#312E81', mid: '#7C3AED', accent: '#22C55E', skin: '#8D5524', hair: '#111827' },
]

const roleAccent: Record<User['role'], string> = {
  admin  : '#030303',
  trainer: '#38BDF8',
  student: '#F9E400',
}

const hashSeed = (value: string) => {
  return [...value].reduce((total, char) => {
    return (total * 31 + char.charCodeAt(0)) >>> 0
  }, 7)
}

const getDisplayName = (user: User) => {
  return [user.firstname, user.lastname].filter(Boolean).join(' ') || user.username || user.email
}

const getInitials = (user: User) => {
  const name     = getDisplayName(user)
  const parts    = name.replace('@', '').split(/\s+/).filter(Boolean)
  const initials = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : name.slice(0, 2)

  return initials.toUpperCase()
}

const svgDataUri = (svg: string) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const createGeneratedAvatar = (user: User) => {
  const seed     = hashSeed(`${user.email}-${user.username}-${user.role}`)
  const color    = palette[seed % palette.length]
  const accent   = roleAccent[user.role] || color.accent

  const cells = Array.from({ length: 50 }, (_, i) => ((seed >> (i % 24)) & 1) === 1)

  const size    = 12
  const padding = 2

  const squares = cells.flatMap((filled, index) => {
    if (!filled) return []

    const row = Math.floor(index / 3)
    const col = index % 3

    const x = padding + col * size
    const y = padding + row * size

    return [
      `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="2" fill="${accent}" opacity="0.9"/>`,
      `<rect x="${96 - padding - size - col * size}" y="${y}" width="${size}" height="${size}" rx="2" fill="${accent}" opacity="0.9"/>`
    ]
  }).join('')

  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="96" y2="96">
          <stop stop-color="${color.mid}"/>
          <stop offset="1" stop-color="${color.bg}"/>
        </linearGradient>
      </defs>

      <rect width="96" height="96" fill="url(#bg)"/>

      ${squares}

    </svg>
  `)
}

const AppUserAvatar = ({ user, size = 40, sx, ...props }: AppUserAvatarProps) => {
  const displayName = getDisplayName(user)

  return (
    <Avatar
      {...props}
      alt={displayName}
      src={createGeneratedAvatar(user)}
      sx={{
        width       : size,
        height      : size,
        bgcolor     : 'background.paper',
        borderRadius: 0,
        padding     : 0,
        ...sx,
      }}
    >
      {getInitials(user)}
    </Avatar>
  )
}

export default AppUserAvatar
