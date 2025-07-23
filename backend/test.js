const now = new Date();

    // 2. Calculate the first day of the month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(),1)
    // 3. Calculate the last day of the month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 0, 23, 59, 59);

console.log(startOfMonth);
console.log(endOfMonth.toLocaleString());
