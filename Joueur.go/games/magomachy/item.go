package magomachy

// Item is objects that help the players.
type Item interface {
	// Parent interfaces
	GameObject

	// -- Attributes -- \\

	// Form is the type of Item this is.
	Form() string

	// Lifetime is how many turns this item has existed for.
	Lifetime() int64

	// Tile is the Tile this Item is on.
	Tile() Tile
}
