import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { vkUserId: 1 },
    update: {
      firstName: 'Ivan',
      lastName: 'Ivanov',
      avatarUrl: 'https://vk.com/images/camera_200.png',
      theme: 'LIGHT',
      tabOrder: JSON.stringify(['music', 'video', 'podcast', 'community', 'games', 'friends']),
    },
    create: {
      vkUserId: 1,
      firstName: 'Ivan',
      lastName: 'Ivanov',
      avatarUrl: 'https://vk.com/images/camera_200.png',
      theme: 'LIGHT',
      tabOrder: JSON.stringify(['music', 'video', 'podcast', 'community', 'games', 'friends']),
    },
  });

  await prisma.statistic.upsert({
    where: { userId: user.id },
    update: { views: 321, comments: 18, followers: 3, healthScore: 7791 },
    create: {
      userId: user.id,
      views: 321,
      comments: 18,
      followers: 3,
      healthScore: 7791,
    },
  });

  await prisma.contentItem.deleteMany();
  await prisma.contentItem.createMany({
    data: [
      // Music
      { type: 'MUSIC', title: 'Example Track 0', subtitle: 'subtitle', order: 0 },
      { type: 'MUSIC', title: 'Example Track 1', subtitle: 'subtitle', order: 1 },
      { type: 'MUSIC', title: 'Example Track 2', subtitle: 'subtitle', order: 2 },
      { type: 'MUSIC', title: 'Example Track 3', subtitle: 'subtitle', order: 3 },
      { type: 'MUSIC', title: 'Example Track 4', subtitle: 'subtitle', order: 4 },
      // Video
      { type: 'VIDEO', title: 'Example Video 0', subtitle: 'subtitle', order: 0 },
      { type: 'VIDEO', title: 'Example Video 1', subtitle: 'subtitle', order: 1 },
      { type: 'VIDEO', title: 'Example Video 2', subtitle: 'subtitle', order: 2 },
      { type: 'VIDEO', title: 'Example Video 3', subtitle: 'subtitle', order: 3 },
      { type: 'VIDEO', title: 'Example Video 4', subtitle: 'subtitle', order: 4 },
      // Podcasts
      { type: 'PODCAST', title: 'Example Podcast 0', subtitle: 'subtitle', order: 0 },
      { type: 'PODCAST', title: 'Example Podcast 1', subtitle: 'subtitle', order: 1 },
      { type: 'PODCAST', title: 'Example Podcast 2', subtitle: 'subtitle', order: 2 },
      { type: 'PODCAST', title: 'Example Podcast 3', subtitle: 'subtitle', order: 3 },
      { type: 'PODCAST', title: 'Example Podcast 4', subtitle: 'subtitle', order: 4 },
      // Communities
      { type: 'COMMUNITY', title: 'Example Community 0', subtitle: 'subtitle', order: 0 },
      { type: 'COMMUNITY', title: 'Example Community 1', subtitle: 'subtitle', order: 1 },
      { type: 'COMMUNITY', title: 'Example Community 2', subtitle: 'subtitle', order: 2 },
      { type: 'COMMUNITY', title: 'Example Community 3', subtitle: 'subtitle', order: 3 },
      { type: 'COMMUNITY', title: 'Example Community 4', subtitle: 'subtitle', order: 4 },
      // Games
      { type: 'GAME', title: 'Example Game 0', subtitle: 'subtitle', order: 0 },
      { type: 'GAME', title: 'Example Game 1', subtitle: 'subtitle', order: 1 },
      { type: 'GAME', title: 'Example Game 2', subtitle: 'subtitle', order: 2 },
      { type: 'GAME', title: 'Example Game 3', subtitle: 'subtitle', order: 3 },
      { type: 'GAME', title: 'Example Game 4', subtitle: 'subtitle', order: 4 },
      // Friends
      { type: 'FRIEND', title: 'Example Friend 0', subtitle: 'subtitle', order: 0 },
      { type: 'FRIEND', title: 'Example Friend 1', subtitle: 'subtitle', order: 1 },
      { type: 'FRIEND', title: 'Example Friend 2', subtitle: 'subtitle', order: 2 },
      { type: 'FRIEND', title: 'Example Friend 3', subtitle: 'subtitle', order: 3 },
      { type: 'FRIEND', title: 'Example Friend 4', subtitle: 'subtitle', order: 4 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
