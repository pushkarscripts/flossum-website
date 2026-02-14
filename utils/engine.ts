// Utility to sleep
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ANSI Colors
export const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  reset: "\x1b[0m",
  redBright: "\x1b[91m",
};

export const rgb = (r: number, g: number, b: number) => `\x1b[38;2;${r};${g};${b}m`;

// Interface for anything that acts like a terminal writer
export interface ITerminal {
  write(text: string): void;
  writeln(text: string): void;
}

export class FlossumEngine {
  term: ITerminal;

  constructor(term: ITerminal) {
    this.term = term;
  }

  async typeOut(text: string, speed = 50) {
    for (const char of text) {
      this.term.write(char);
      await sleep(speed);
    }
    this.term.writeln("");
  }

  async reverseType(text: string, speed = 50) {
    // This logic needs to be careful about clearing lines if it's simulating the "reveal"
    // Usually reverseType reveals from end.
    // Logic: 
    // Frame 1: "      d"
    // Frame 2: "     ld"
    // ...
    // But standard CLI implementation might just overwrite.
    // Let's use the logic from the library:
    /*
      for (let i = text.length; i >= 0; i--) {
        process.stdout.write(`\r${text.slice(i)}`);
        await sleep(speed);
      }
    */
    for (let i = text.length; i >= 0; i--) {
        this.term.write(`\r\x1b[2K${text.slice(i)}`);
        await sleep(speed);
    }
    this.term.writeln("");
  }

  async spinner(text = "", duration = 2000) {
    const frames = ["|", "/", "-", "\\"];
    const interval = 100;
    const cycles = Math.ceil(duration / interval);

    for (let i = 0; i < cycles; i++) {
      const frame = frames[i % frames.length];
      this.term.write(`\r\x1b[2K${frame} ${text}`);
      await sleep(interval);
    }
    this.term.writeln("");
  }

  async rainbow(text: string, { duration = 2000 } = {}) {
    const frames = 20;
    const colorKeys = ["red", "yellow", "green", "cyan", "blue", "magenta"];

    for (let i = 0; i < frames; i++) {
      const colored = text
        .split("")
        .map((char, idx) => {
          // @ts-ignore
          const colorCode = colors[colorKeys[(i + idx) % colorKeys.length]];
          return `${colorCode}${char}${colors.reset}`;
        })
        .join("");
      this.term.write(`\r\x1b[2K${colored}`);
      await sleep(duration / frames);
    }
    this.term.writeln("");
  }

  async wave(text: string, { duration = 2000 } = {}) {
    const frames = 10;
    const waveHeight = 3;

    for (let i = 0; i < frames; i++) {
      const frame = text
        .split("")
        .map((char, idx) => {
          const offset = Math.sin((i + idx) / 2) * waveHeight;
          const r = Math.max(0, Math.min(255, Math.round(255 - offset * 20)));
          const g = Math.max(0, Math.min(255, Math.round(100 + offset * 30)));
          const b = 255;
          return `${rgb(r, g, b)}${char}${colors.reset}`;
        })
        .join("");

      this.term.write(`\r\x1b[2K${frame}`);
      await sleep(duration / frames);
    }
    this.term.writeln("");
  }

  async glitch(text: string, { duration = 2000, steps = 10 } = {}) {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:,<.>/";
    const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

    for (let i = 0; i < steps; i++) {
      const glitched = text
        .split("")
        .map((char) =>
          Math.random() < 0.3
            ? `${colors.redBright}${randomChar()}${colors.reset}`
            : char
        )
        .join("");
      this.term.write(`\r\x1b[2K${glitched}`);
      await sleep(duration / steps);
    }
    this.term.write(`\r\x1b[2K${text}\n`);
  }

  async scramble(text: string, { duration = 1000 } = {}) {
    const pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const steps = text.length;

    for (let i = 0; i <= steps; i++) {
      const scrambled = text
        .split("")
        .map((char, idx) => {
          if (idx < i) return char;
          return pool[Math.floor(Math.random() * pool.length)];
        })
        .join("");
      this.term.write(`\r\x1b[2K${scrambled}`);
      await sleep(duration / steps);
    }
    this.term.writeln("");
  }

  async pulse(text: string, duration = 2000) {
      // Pulse animation: simply toggles color? Or fades?
      // Library impl:
      /*
        const frames = duration / 100;
        for (let i = 0; i < frames; i++) {
            const color = i % 2 === 0 ? chalk.blue : chalk.cyan;
            process.stdout.write(`\r${color(text)}`);
            await sleep(100);
        }
      */
     const frames = Math.ceil(duration / 100);
     for (let i = 0; i < frames; i++) {
         const color = i % 2 === 0 ? colors.blue : colors.cyan;
         this.term.write(`\r\x1b[2K${color}${text}${colors.reset}`);
         await sleep(100);
     }
     this.term.writeln("");
  }

  async progressBar({ width = 30, duration = 2000, char = '█' } = {}) {
      const steps = width;
      for (let i = 0; i <= steps; i++) {
          const bar = char.repeat(i) + '-'.repeat(steps - i);
          const percent = Math.floor((i / steps) * 100);
          this.term.write(`\r\x1b[2K[${bar}] ${percent}%`);
          await sleep(duration / steps);
      }
      this.term.writeln("");
  }

  async dots(text = '', { cycles = 5, interval = 300, char = '.', maxDots = 3 } = {}) {
      for (let cycle = 0; cycle < cycles; cycle++) {
          for (let i = 1; i <= maxDots; i++) {
              this.term.write(`\r\x1b[2K${text}${char.repeat(i)}`);
              await sleep(interval);
          }
      }
      this.term.writeln("");
  }

  async flash(text: string, { flashes = 6, interval = 150 } = {}) {
      for (let i = 0; i < flashes; i++) {
          this.term.write(`\r\x1b[2K${text}`);
          await sleep(interval);
          this.term.write(`\r\x1b[2K`); // clear
          await sleep(interval);
      }
      this.term.write(`\r\x1b[2K${text}\n`);
  }

  async typeDelete(text: string, { delay = 100, deleteDelay = 100, pause = 1000, repeat = false } = {}) {
      do {
          // Type
          for (let i = 0; i <= text.length; i++) {
              this.term.write(`\r\x1b[2K${text.slice(0, i)}`);
              await sleep(delay);
          }
          await sleep(pause);
          // Delete
          for (let i = text.length; i >= 0; i--) {
              this.term.write(`\r\x1b[2K${text.slice(0, i)}`);
              await sleep(deleteDelay);
          }
          if (!repeat) break;
      } while (true);
      this.term.writeln("");
  }
}
