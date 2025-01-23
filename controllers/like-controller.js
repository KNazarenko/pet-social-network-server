const { prisma } = require('../prisma/prisma-client')


const LikeController = {
	likePost: async (req, res) => {
		const { postId } = req.body;
		const userId = req.user.userId;

		if (!postId) {
			return res.status(400).json({ error: "All fields are required" })
		}

		try {
			const existingLike = await prisma.like.findFirst({
				where: { postId, userId }
			})

			if (existingLike) {
				return res.status(400).json({
					error: "You've liked it already"
				})
			}

			const like = await prisma.like.create({
				data: { postId, userId }
			})

			res.json(like);

		} catch (error) {
			console.error("Like post Error: ", error);
			res.status(500).json({ error: "Internal server error" })
		}
	},
	unlikePost: async (req, res) => {
		const { id } = req.params;
		const userId = req.user.userId;

		console.log(req.params)

		if (!id) {
			return res.status(400).json({ error: "All fields are required" })
		}

		try {
			const existingLike = await prisma.like.findFirst({
				where: { postId: id, userId }
			})

			if (!existingLike) {
				return res.status(400).json({ error: "You've disliked it already" })
			}

			const unlike = await prisma.like.deleteMany({
				where: { postId: id, userId }
			})

			res.json(unlike)
		} catch (error) {
			console.error("Unlike post Error: ", error);
			res.status(500).json({ error: "Internal server error" })
		}
	}
}

module.exports = LikeController;