export const _currency = (amount: number, symbol: string = 'VND'): string => {
    // Format number with thousands separators
    const formattedAmount = new Intl.NumberFormat('vi-VN').format(amount);
    
    // Return formatted amount with symbol
    return `${formattedAmount} ${symbol}`;
}