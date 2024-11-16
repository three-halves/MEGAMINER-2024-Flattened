#ifndef GAMES_MAGOMACHY_ITEM_H
#define GAMES_MAGOMACHY_ITEM_H

// Item
// Objects that help the players.

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
/// Objects that help the players.
/// </summary>
class Item_ : public Game_object_
{
public:

    /// <summary>
    /// The type of Item this is.
    /// </summary>
    const std::string& form;

    /// <summary>
    /// How many turns this item has existed for.
    /// </summary>
    const int& lifetime;

    /// <summary>
    /// How long the item is allowed to last for.
    /// </summary>
    const int& max_life;

    /// <summary>
    /// What item spawns on this tile.
    /// </summary>
    const std::string& object_spawn;

    /// <summary>
    /// Turns until item should spawn.
    /// </summary>
    const int& spawn_timer;

    /// <summary>
    /// The Tile this Item is on.
    /// </summary>
    const Tile& tile;

    // <<-- Creer-Merge: member variables -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
    // You can add additional member variables here. None of them will be tracked or updated by the server.
    // <<-- /Creer-Merge: member variables -->>



   // <<-- Creer-Merge: methods -->> - Code you add between this comment and the end comment will be preserved between Creer re-runs.
   // You can add additional methods here.
   // <<-- /Creer-Merge: methods -->>

   ~Item_();

   // ####################
   // Don't edit these!
   // ####################
   /// \cond FALSE
   Item_(std::initializer_list<std::pair<std::string, Any&&>> init);
   Item_() : Item_({}){}
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

#endif // GAMES_MAGOMACHY_ITEM_H
