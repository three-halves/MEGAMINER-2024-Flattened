package magomachy

// Item is objects that help the players.
type Item interface {
	// Parent interfaces
	GameObject

	// -- Attributes -- \\

	// Tile is the Tile this Item is on.
	Tile() Item
}
