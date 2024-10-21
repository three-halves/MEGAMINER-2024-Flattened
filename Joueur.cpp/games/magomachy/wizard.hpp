#ifndef GAMES_MAGOMACHY_WIZARD_H
#define GAMES_MAGOMACHY_WIZARD_H

// Wizard
// The wizard default.

// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify its member variables.
// Instead, you should only be reading its variables and calling its functions.

#include <vector>
#include <queue>
#include <deque>
#include <unordered_map>
#include <string>
#include <initializer_list>

#include "../../joueur/src/any.hpp"

#include "game_object.hpp"

#include "impl/magomachy_fwd.hpp"

// <<-- Creer-Merge: includes -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
// you can add additional #includes here
// <<-- /Creer-Merge: includes -->>

namespace cpp_client
{

namespace magomachy
{

/// <summary>
/// The wizard default.
/// </summary>
class Wizard_ : public Game_object_
{
public:

    /// <summary>
    /// The amount of spell resources this Player has.
    /// </summary>
    const int& aether;

    /// <summary>
    /// The attack value of the player.
    /// </summary>
    const int& attack;

    /// <summary>
    /// The defense value of the player.
    /// </summary>
    const int& defense;

    /// <summary>
    /// The amount of health this player has.
    /// </summary>
    const int& health;

    /// <summary>
    /// The Player that owns and can control this Unit, or null if the Unit is neutral.
    /// </summary>
    const Player& owner;

    /// <summary>
    /// Specific type of Wizard.
    /// </summary>
    const std::string& specialty;

    /// <summary>
    /// The speed of the player.
    /// </summary>
    const int& speed;

    /// <summary>
    /// The x coordinate of the wizard.
    /// </summary>
    const int& x;

    /// <summary>
    /// The y coordinate of the wizard.
    /// </summary>
    const int& y;

    // <<-- Creer-Merge: member variables -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    // You can add additional member variables here. None of them will be tracked or updated by the server.
    // <<-- /Creer-Merge: member variables -->>



   // <<-- Creer-Merge: methods -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
   // You can add additional methods here.
   // <<-- /Creer-Merge: methods -->>

   ~Wizard_();

   // ####################
   // Don't edit these!
   // ####################
   /// \cond FALSE
   Wizard_(std::initializer_list<std::pair<std::string, Any&&>> init);
   Wizard_() : Wizard_({}){}
   virtual void resize(const std::string& name, std::size_t size) override;
   virtual void change_vec_values(const std::string& name, std::vector<std::pair<std::size_t, Any>>& values) override;
   virtual void remove_key(const std::string& name, Any& key) override;
   virtual std::unique_ptr<Any> add_key_value(const std::string& name, Any& key, Any& value) override;
   virtual bool is_map(const std::string& name) override;
   virtual void rebind_by_name(Any* to_change, const std::string& member, std::shared_ptr<Base_object> ref) override;
    /// \endcond
    // ####################
    // Don't edit these!
    // ####################
};

} // magomachy

} // cpp_client

#endif // GAMES_MAGOMACHY_WIZARD_H
