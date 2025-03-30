import users from '../data/users.json';
import products from '../data/products.json';

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] ** 2;
    normB += vecB[i] ** 2;
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function getCollaborativeRecommendations(userId) {
  const currentUser = users.find(u => u.id === userId);
  if (!currentUser) return [];

  const allUsers = users.filter(u => u.id !== userId);
  const userItemMatrix = allUsers.map(u => ({
    userId: u.id,
    purchases: products.map(p => u.purchase_history.includes(p.id) ? 1 : 0)
  }));

  const similarities = userItemMatrix.map(u => ({
    userId: u.userId,
    similarity: cosineSimilarity(
      currentUser.purchase_history.map(p => products.some(pp => pp.id === p) ? 1 : 0),
      u.purchases
    )
  }));

  const topUsers = similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

  const recommendedProductIds = [];
  topUsers.forEach(u => {
    const userPurchases = users.find(usr => usr.id === u.userId)?.purchase_history || [];
    userPurchases.forEach(productId => {
      if (!currentUser.purchase_history.includes(productId)) {
        recommendedProductIds.push(productId);
      }
    });
  });

  // Pastikan produk ada di products.json
  const uniqueProductIds = [...new Set(recommendedProductIds)];
  return products.filter(p => 
    uniqueProductIds.includes(p.id) && 
    p.name && p.category && p.price !== undefined
  );
}