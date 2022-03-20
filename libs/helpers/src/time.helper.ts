export class TimeHelper {
  public static randomTime(min, max): number {
    return Math.random() * (max - min) + min;
  }

  public static delay(min: number, max: number) {
    const ms = this.randomTime(min, max);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
