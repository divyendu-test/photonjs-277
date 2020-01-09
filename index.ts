import { Photon } from '@prisma/photon'

const photon = new Photon()

async function main() {
  // Clean up
  const deleteUsers = await photon.users.deleteMany({})
  console.log({ deleteUsers })

  const originalUser = await photon.users.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })
  console.log({ originalUser })
  const upsert1 = await photon.users.upsert({
    where: {
      id: originalUser.id,
    },
    update: {
      email: 'alice@prisma.io',
    },
    create: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })
  console.log({ upsert1 })

  const upsert2 = await photon.users.upsert({
    where: {
      id: originalUser.id,
    },
    update: {
      id: originalUser.id,
      email: 'alice@prisma.io',
    },
    create: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })
  console.log({ upsert2 })

  const data = {
    id: originalUser.id,
    email: 'alice@prisma.io',
    name: 'Alice',
  }

  const upsert3 = await photon.users.upsert({
    where: {
      id: originalUser.id,
    },
    update: data,
    create: data,
  })
  console.log({ upsert3 })
}

main()
