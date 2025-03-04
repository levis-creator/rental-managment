export class Statistic<T> {
    constructor() { }

    sum(data: T[], key: keyof T): number {
        const result = data.reduce((previous: number, current: T) => {
            const value = Number(current[key]);
            return previous + (isNaN(value) ? 0 : value);
        }, 0);
        return result;
    }

    average(data: T[], key: keyof T): number {
        if (data.length === 0) return 0;
        const total = this.sum(data, key);
        return total / data.length;
    }

    max(data: T[], key: keyof T): number {
        const values = data.map(item => Number(item[key])).filter(value => !isNaN(value));
        return values.length > 0 ? Math.max(...values) : 0;
    }

    min(data: T[], key: keyof T): number {
        const values = data.map(item => Number(item[key])).filter(value => !isNaN(value));
        return values.length > 0 ? Math.min(...values) : 0;
    }

    count(data: T[]): number {
        return data.length;
    }

    distinct(data: T[], key: keyof T): T[] {
        const seen = new Set<unknown>();
        return data.filter(item => {
            const value = item[key];
            if (seen.has(value)) {
                return false;
            }
            seen.add(value);
            return true;
        });
    }
}