package impl

import (
	"errors"
	"joueur/base"
	"joueur/games/magomachy"
)

// WizardImpl is the struct that implements the container for Wizard
// instances in Magomachy.
type WizardImpl struct {
	GameObjectImpl

	aetherImpl         int64
	attackImpl         int64
	defenseImpl        int64
	directionImpl      int64
	effectTimesImpl    []int64
	effectsImpl        []string
	hasCastImpl        bool
	hasTeleportedImpl  bool
	healthImpl         int64
	lastSpellImpl      string
	lastTargetTileImpl magomachy.Tile
	maxHealthImpl      int64
	movementLeftImpl   int64
	ownerImpl          magomachy.Player
	specialtyImpl      string
	speedImpl          int64
	teleportTileImpl   magomachy.Tile
	tileImpl           magomachy.Tile
}

// Aether returns the amount of spell resources this Player has.
func (wizardImpl *WizardImpl) Aether() int64 {
	return wizardImpl.aetherImpl
}

// Attack returns the attack value of the player.
func (wizardImpl *WizardImpl) Attack() int64 {
	return wizardImpl.attackImpl
}

// Defense returns the defense value of the player.
func (wizardImpl *WizardImpl) Defense() int64 {
	return wizardImpl.defenseImpl
}

// Direction returns the direction this Wizard is facing.
func (wizardImpl *WizardImpl) Direction() int64 {
	return wizardImpl.directionImpl
}

// EffectTimes returns the turns remaining on each active effects on
// Wizard.
func (wizardImpl *WizardImpl) EffectTimes() []int64 {
	return wizardImpl.effectTimesImpl
}

// Effects returns the names of active effects on the Wizard.
func (wizardImpl *WizardImpl) Effects() []string {
	return wizardImpl.effectsImpl
}

// HasCast returns whether or not this Wizard has cast a spell this turn.
func (wizardImpl *WizardImpl) HasCast() bool {
	return wizardImpl.hasCastImpl
}

// HasTeleported returns whether or not this Wizard has cast a teleport
// spell this turn.
func (wizardImpl *WizardImpl) HasTeleported() bool {
	return wizardImpl.hasTeleportedImpl
}

// Health returns the amount of health this player has.
func (wizardImpl *WizardImpl) Health() int64 {
	return wizardImpl.healthImpl
}

// LastSpell returns the spell this wizard just casted. Undefined if no
// spell was cast.
//
// Value can be returned as a nil pointer.
func (wizardImpl *WizardImpl) LastSpell() string {
	return wizardImpl.lastSpellImpl
}

// LastTargetTile returns the tile this wizard just cast to. Undefined if
// no tile was targeted.
//
// Value can be returned as a nil pointer.
func (wizardImpl *WizardImpl) LastTargetTile() magomachy.Tile {
	return wizardImpl.lastTargetTileImpl
}

// MaxHealth returns max health of wizard.
func (wizardImpl *WizardImpl) MaxHealth() int64 {
	return wizardImpl.maxHealthImpl
}

// MovementLeft returns how much movement the wizard has left.
func (wizardImpl *WizardImpl) MovementLeft() int64 {
	return wizardImpl.movementLeftImpl
}

// Owner returns the Player that owns and can control this Unit, or nil if
// the Unit is neutral.
//
// Value can be returned as a nil pointer.
func (wizardImpl *WizardImpl) Owner() magomachy.Player {
	return wizardImpl.ownerImpl
}

// Specialty returns specific type of Wizard.
//
// Literal Values: "aggressive", "defensive", "sustaining", or "strategic"
func (wizardImpl *WizardImpl) Specialty() string {
	return wizardImpl.specialtyImpl
}

// Speed returns the speed of the player.
func (wizardImpl *WizardImpl) Speed() int64 {
	return wizardImpl.speedImpl
}

// TeleportTile returns where the wizard has a teleport rune out, undefined
// otherwise.
//
// Value can be returned as a nil pointer.
func (wizardImpl *WizardImpl) TeleportTile() magomachy.Tile {
	return wizardImpl.teleportTileImpl
}

// Tile returns the Tile that this Wizard is on.
//
// Value can be returned as a nil pointer.
func (wizardImpl *WizardImpl) Tile() magomachy.Tile {
	return wizardImpl.tileImpl
}

// Cast runs logic that casts a spell on a Tile in range.
func (wizardImpl *WizardImpl) Cast(spellName string, tile magomachy.Tile) bool {
	return wizardImpl.RunOnServer("cast", map[string]interface{}{
		"spellName": spellName,
		"tile":      tile,
	}).(bool)
}

// CheckBressenham runs logic that check if a tile can be reached with a
// projectile spell.
func (wizardImpl *WizardImpl) CheckBressenham(tile magomachy.Tile) []magomachy.Tile {
	return wizardImpl.RunOnServer("checkBressenham", map[string]interface{}{
		"tile": tile,
	}).([]magomachy.Tile)
}

// Move runs logic that moves this Wizard from its current Tile to another
// empty Tile.
func (wizardImpl *WizardImpl) Move(tile magomachy.Tile) bool {
	return wizardImpl.RunOnServer("move", map[string]interface{}{
		"tile": tile,
	}).(bool)
}

// InitImplDefaults initializes safe defaults for all fields in Wizard.
func (wizardImpl *WizardImpl) InitImplDefaults() {
	wizardImpl.GameObjectImpl.InitImplDefaults()

	wizardImpl.aetherImpl = 0
	wizardImpl.attackImpl = 0
	wizardImpl.defenseImpl = 0
	wizardImpl.directionImpl = 0
	wizardImpl.effectTimesImpl = []int64{}
	wizardImpl.effectsImpl = []string{}
	wizardImpl.hasCastImpl = true
	wizardImpl.hasTeleportedImpl = true
	wizardImpl.healthImpl = 0
	wizardImpl.lastSpellImpl = ""
	wizardImpl.lastTargetTileImpl = nil
	wizardImpl.maxHealthImpl = 0
	wizardImpl.movementLeftImpl = 0
	wizardImpl.ownerImpl = nil
	wizardImpl.specialtyImpl = ""
	wizardImpl.speedImpl = 0
	wizardImpl.teleportTileImpl = nil
	wizardImpl.tileImpl = nil
}

// DeltaMerge merges the delta for a given attribute in Wizard.
func (wizardImpl *WizardImpl) DeltaMerge(
	deltaMerge base.DeltaMerge,
	attribute string,
	delta interface{},
) (bool, error) {
	merged, err := wizardImpl.GameObjectImpl.DeltaMerge(
		deltaMerge,
		attribute,
		delta,
	)
	if merged || err != nil {
		return merged, err
	}

	magomachyDeltaMerge, ok := deltaMerge.(DeltaMerge)
	if !ok {
		return false, errors.New(
			"deltaMerge is not the expected type of: " +
				"'magomachy.impl.DeltaMerge'",
		)
	}

	switch attribute {
	case "aether":
		wizardImpl.aetherImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "attack":
		wizardImpl.attackImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "defense":
		wizardImpl.defenseImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "direction":
		wizardImpl.directionImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "effectTimes":
		wizardImpl.effectTimesImpl = magomachyDeltaMerge.ArrayOfInt(&wizardImpl.effectTimesImpl, delta)
		return true, nil
	case "effects":
		wizardImpl.effectsImpl = magomachyDeltaMerge.ArrayOfString(&wizardImpl.effectsImpl, delta)
		return true, nil
	case "hasCast":
		wizardImpl.hasCastImpl = magomachyDeltaMerge.Boolean(delta)
		return true, nil
	case "hasTeleported":
		wizardImpl.hasTeleportedImpl = magomachyDeltaMerge.Boolean(delta)
		return true, nil
	case "health":
		wizardImpl.healthImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "lastSpell":
		wizardImpl.lastSpellImpl = magomachyDeltaMerge.String(delta)
		return true, nil
	case "lastTargetTile":
		wizardImpl.lastTargetTileImpl = magomachyDeltaMerge.Tile(delta)
		return true, nil
	case "maxHealth":
		wizardImpl.maxHealthImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "movementLeft":
		wizardImpl.movementLeftImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "owner":
		wizardImpl.ownerImpl = magomachyDeltaMerge.Player(delta)
		return true, nil
	case "specialty":
		wizardImpl.specialtyImpl = magomachyDeltaMerge.String(delta)
		return true, nil
	case "speed":
		wizardImpl.speedImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "teleportTile":
		wizardImpl.teleportTileImpl = magomachyDeltaMerge.Tile(delta)
		return true, nil
	case "tile":
		wizardImpl.tileImpl = magomachyDeltaMerge.Tile(delta)
		return true, nil
	}

	return false, nil // no errors in delta merging
}
