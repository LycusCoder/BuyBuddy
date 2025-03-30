import transactions from '../data/transactions.json';
import products from '../data/products.json';

function generateFrequentItemsets(transactions, minSupport) {
  const itemCounts = {};
  const totalTransactions = transactions.length;

  transactions.forEach(transaction => {
    transaction.products.forEach(productId => {
      itemCounts[productId] = (itemCounts[productId] || 0) + 1;
    });
  });

  const frequentItems = Object.keys(itemCounts).filter(itemId => 
    itemCounts[itemId] / totalTransactions >= minSupport
  );

  const pairCounts = {};
  transactions.forEach(transaction => {
    const filteredItems = transaction.products.filter(itemId => 
      frequentItems.includes(itemId.toString())
    );
    
    for (let i = 0; i < filteredItems.length; i++) {
      for (let j = i + 1; j < filteredItems.length; j++) {
        const pair = [filteredItems[i], filteredItems[j]].sort();
        const key = pair.join('-');
        pairCounts[key] = (pairCounts[key] || 0) + 1;
      }
    }
  });

  return Object.keys(pairCounts)
    .filter(key => pairCounts[key] / totalTransactions >= minSupport)
    .map(key => key.split('-').map(Number));
}

export function getAprioriRecommendations(userId, minSupport = 0.2, minConfidence = 0.4) {
  const completedTransactions = transactions.filter(t => 
    t.status === 'completed'
  );

  const userTransactions = completedTransactions
    .filter(t => t.userId === userId)
    .flatMap(t => t.products);

  if (userTransactions.length === 0) return [];

  const frequentItemsets = generateFrequentItemsets(completedTransactions, minSupport);
  const rules = [];

  frequentItemsets.forEach(itemset => {
    for (let i = 0; i < itemset.length; i++) {
      const antecedent = [itemset[i]];
      const consequent = itemset.filter(item => item !== itemset[i]);

      const support = completedTransactions.filter(t => 
        antecedent.every(a => t.products.includes(a)) &&
        consequent.every(c => t.products.includes(c))
      ).length / completedTransactions.length;

      const confidence = support / 
        (completedTransactions.filter(t => antecedent.every(a => t.products.includes(a))).length / completedTransactions.length);

      if (confidence >= minConfidence) {
        rules.push({ antecedent, consequent, confidence });
      }
    }
  });

  const recommendedProductIds = [];
  userTransactions.forEach(productId => {
    rules.forEach(rule => {
      if (rule.antecedent.includes(productId)) {
        recommendedProductIds.push(...rule.consequent);
      }
    });
  });

  // Validasi produk
  const uniqueProductIds = [...new Set(recommendedProductIds)];
  return products.filter(p => 
    uniqueProductIds.includes(p.id) &&
    p.name && p.category && p.price !== undefined
  );
}