import { describe, it, expect } from 'vitest';
import { formatPrice, formatDuration, slugify, isValidEmail } from './utils';

describe('formatPrice', () => {
  it('formats positive numbers as USD currency', () => {
    expect(formatPrice(50)).toBe('$50.00');
    expect(formatPrice(29.99)).toBe('$29.99');
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('formats numeric string inputs', () => {
    expect(formatPrice('150')).toBe('$150.00');
    expect(formatPrice('19.95')).toBe('$19.95');
  });

  it('gracefully handles invalid, null, or undefined inputs', () => {
    expect(formatPrice(null)).toBe('$0.00');
    expect(formatPrice(undefined)).toBe('$0.00');
    expect(formatPrice('not-a-number')).toBe('$0.00');
  });
});

describe('formatDuration', () => {
  it('formats minutes under an hour', () => {
    expect(formatDuration(45)).toBe('45m');
    expect(formatDuration(15)).toBe('15m');
  });

  it('formats exact hours', () => {
    expect(formatDuration(60)).toBe('1h');
    expect(formatDuration(120)).toBe('2h');
  });

  it('formats mixed hours and minutes', () => {
    expect(formatDuration(75)).toBe('1h 15m');
    expect(formatDuration(150)).toBe('2h 30m');
  });

  it('gracefully handles empty, null, or negative inputs', () => {
    expect(formatDuration(null)).toBe('0m');
    expect(formatDuration(undefined)).toBe('0m');
    expect(formatDuration(0)).toBe('0m');
    expect(formatDuration(-10)).toBe('0m');
  });
});

describe('slugify', () => {
  it('converts basic text to url slugs', () => {
    expect(slugify('Low Fade')).toBe('low-fade');
    expect(slugify('  Beard Oil  ')).toBe('beard-oil');
  });

  it('replaces ampersands and removes special characters', () => {
    expect(slugify('Cut & Style!')).toBe('cut-and-style');
    expect(slugify('Nails, Hair, etc.')).toBe('nails-hair-etc');
  });

  it('collapses multiple hyphens and trims leading/trailing hyphens', () => {
    expect(slugify('--Low--Fade--')).toBe('low-fade');
  });

  it('handles empty inputs', () => {
    expect(slugify(null)).toBe('');
    expect(slugify(undefined)).toBe('');
  });
});

describe('isValidEmail', () => {
  it('returns true for valid email formats', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name+tag@sub.domain.co')).toBe(true);
  });

  it('returns false for invalid email formats', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('test@example')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('test@.com')).toBe(false);
  });

  it('handles empty inputs', () => {
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});
