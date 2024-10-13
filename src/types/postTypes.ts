export interface PostResponse {
	id: string;
	title: string;
	published: boolean;

	userId: string;
	content: string;

	createdAt: string;
	updatedAt: string;
	authorId: string;
}
