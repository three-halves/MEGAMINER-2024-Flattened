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

	aetherImpl    int64
	attackImpl    int64
	defenseImpl   int64
	healthImpl    int64
	ownerImpl     magomachy.Player
	specialtyImpl string
	speedImpl     int64
	xImpl         int64
	yImpl         int64
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

// Health returns the amount of health this player has.
func (wizardImpl *WizardImpl) Health() int64 {
	return wizardImpl.healthImpl
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

// X returns the x coordinate of the wizard.
func (wizardImpl *WizardImpl) X() int64 {
	return wizardImpl.xImpl
}

// Y returns the y coordinate of the wizard.
func (wizardImpl *WizardImpl) Y() int64 {
	return wizardImpl.yImpl
}

// InitImplDefaults initializes safe defaults for all fields in Wizard.
func (wizardImpl *WizardImpl) InitImplDefaults() {
	wizardImpl.GameObjectImpl.InitImplDefaults()

	wizardImpl.aetherImpl = 0
	wizardImpl.attackImpl = 0
	wizardImpl.defenseImpl = 0
	wizardImpl.healthImpl = 0
	wizardImpl.ownerImpl = nil
	wizardImpl.specialtyImpl = ""
	wizardImpl.speedImpl = 0
	wizardImpl.xImpl = 0
	wizardImpl.yImpl = 0
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
	case "health":
		wizardImpl.healthImpl = magomachyDeltaMerge.Int(delta)
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
	case "x":
		wizardImpl.xImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	case "y":
		wizardImpl.yImpl = magomachyDeltaMerge.Int(delta)
		return true, nil
	}

	return false, nil // no errors in delta merging
}
