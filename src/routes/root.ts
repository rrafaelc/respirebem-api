import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../lib/prisma';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const user = await prisma.user.findMany();

  fastify.get('/api', async function (request, reply) {
    return { root: true, user }
  })
}

export default root;
