 const missingNumber = (nums: number[]): number => {
    const n = nums.length;
    const e = (n * (n + 1)) / 2;
    const s = nums.reduce((a, b) => a + b, 0);
    return e - s;
}

console.log(missingNumber([3, 0, 1])); 
