class CurrencyFormatter {
  private rate: number;
  private formatter: Intl.NumberFormat;

  constructor(rate: number) {
    this.rate = rate;
    this.formatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    });
  }

  // Метод для обновления курса обмена, если он изменится
  setRate(newRate: number): void {
    this.rate = newRate;
  }

  // Метод для конвертации суммы (в долларах) и её форматирования
  format(amount: number): string {
    const converted = amount * this.rate;
    return this.formatter.format(converted);
  }

  // Метод для простой конвертации суммы (в долларах)
  convert(amount: number): number {
    return amount * this.rate;
  }
}

// Экспортируем инстанс с начальным курсом (например, 75)
export const currencyFormatter = new CurrencyFormatter(75);
