const { prisma } = require('../prisma/prisma-client');

const FollowController = {
	followUser: async (req, res) => {
		const { followingId } = req.body;
		const userId = req.user.userId;

		if (followingId === userId) {
			return res.status(500).json({ error: "You cannot follow yourself" })
		}

		try {
			const existingSubscription = await prisma.follows.findFirst({
				where: {
					AND: [
						{ followerId: userId },
						{ followingId }
					]
				}
			})

			if (existingSubscription) {
				return res.status(400).json({ error: "Subscription is exist already" })
			}

			await prisma.follows.create({
				data: {
					follower: { connect: { id: userId } },
					following: { connect: { id: followingId } }
				}
			})

			res.status(201).json({ message: "Subscription is created" })
		} catch (error) {
			console.error("Follow Error: ", error);
			res.status(500).json({ error: "Internal server error" })
		}
	},
	unfollowUser: async (req, res) => {
		const { followingId } = req.body;
		const userId = req.user.userId;

		try {
			const follows = await prisma.follows.findFirst({
				where: {
					AND: [
						{ followerId: userId },
						{ followingId }
					]
				}
			})

			if (!follows) {
				return res.status(404).json({ error: "You don't subscribe on this user" })
			}

			await prisma.follows.delete({
				where: { id: follows.id }
			})

			res.status(201).json({ message: "You unsubscribe" })
		} catch (error) {
			console.error("Unfollow Error: ", error);
			res.status(500).json({ error: "Internal server error" })
		}

	}
}

module.exports = FollowController;