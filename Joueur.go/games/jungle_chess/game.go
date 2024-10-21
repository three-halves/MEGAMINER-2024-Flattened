package jungleChess

import "joueur/base"

// Game is a 7x9 board game with pieces, to win the game the players must
// make successful captures of the enemy and reach the opponents den.
type Game interface {
	// Parent interfaces
	base.Game

	// -- Attributes -- \\

	// GameObjects is a mapping of every game object's ID to the
	// actual game object. Primarily used by the server and client to
	// easily refer to the game objects via ID.
	GameObjects() map[string]GameObject

	// History is the array of [known] moves that have occurred in the
	// game, in a format. The first element is the first move, with
	// the last element being the most recent.
	History() []string

	// JungleFen is the jungleFen is similar to the chess FEN, the
	// order looks like this, board (split into rows by '/'), whose
	// turn it is, half move, and full move.
	JungleFen() string

	// Players is array of all the players in the game.
	Players() []Player

	// Session is a unique identifier for the game instance that is
	// being played.
	Session() string
}
