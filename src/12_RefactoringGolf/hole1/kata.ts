/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = 'O';
const noPlay = ' ';

export class Game {
  private _lastSymbolPlayed = noPlay;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbolPlayed == noPlay) {
      if (player == playerO) {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbolPlayed) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TilePlayedAt(x, y).isNotEmpty) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbolPlayed = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  private x: number = 0;
  private y: number = 0;
  private symbol: string = ' ';

  constructor(x: number, y: number, symbol: string) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
  }

  get Symbol() {
    return this.symbol;
  }

  get isNotEmpty() {
    return this.Symbol !== noPlay;
  }

  hasSameSymbolAs(other: Tile) {
    return this.Symbol === other.Symbol;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.x == other.x && this.y == other.y;
  }

  updateSymbol(newSymbol: string) {
    this.symbol = newSymbol;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = firstRow; x <= thirdRow; x++) {
      for (let y = firstColumn; y <= thirdColumn; y++) {
        this._plays.push(new Tile(x, y, noPlay));
      }
    }
  }

  public TilePlayedAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, noPlay)))!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays
      .find((t: Tile) => t.hasSameCoordinatesAs(new Tile(x, y, symbol)))!
      .updateSymbol(symbol);
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this.TilePlayedAt(firstRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this.TilePlayedAt(secondRow, firstColumn)!.Symbol;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this.TilePlayedAt(thirdRow, firstColumn)!.Symbol;
    }

    return noPlay;
  }

  private isRowFull(row: number) {
    return (
      this.TilePlayedAt(row, firstColumn)!.isNotEmpty &&
      this.TilePlayedAt(row, secondColumn)!.isNotEmpty &&
      this.TilePlayedAt(row, thirdColumn)!.isNotEmpty
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this.TilePlayedAt(row, firstColumn)!.hasSameSymbolAs(this.TilePlayedAt(row, secondColumn)!) &&
      this.TilePlayedAt(row, thirdColumn)!.hasSameSymbolAs(this.TilePlayedAt(row, secondColumn)!)
    );
  }
}
