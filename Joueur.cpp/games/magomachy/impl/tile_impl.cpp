// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify its member variables.
// This contains implementation details, written by code, and only useful to code



#include "../tile.hpp"
#include "../../../joueur/src/base_ai.hpp"
#include "../../../joueur/src/any.hpp"
#include "../../../joueur/src/exceptions.hpp"
#include "../../../joueur/src/delta.hpp"
#include "../game_object.hpp"
#include "../item.hpp"
#include "../player.hpp"
#include "../tile.hpp"
#include "../wizard.hpp"
#include "magomachy.hpp"

#include <type_traits>

namespace cpp_client
{

namespace magomachy
{


Tile_::Tile_(std::initializer_list<std::pair<std::string, Any&&>> init) :
    Game_object_{
        {"object", Any{std::decay<decltype(object)>::type{}}},
        {"tileEast", Any{std::decay<decltype(tile_east)>::type{}}},
        {"tileNorth", Any{std::decay<decltype(tile_north)>::type{}}},
        {"tileSouth", Any{std::decay<decltype(tile_south)>::type{}}},
        {"tileWest", Any{std::decay<decltype(tile_west)>::type{}}},
        {"type", Any{std::decay<decltype(type)>::type{}}},
        {"wizard", Any{std::decay<decltype(wizard)>::type{}}},
        {"x", Any{std::decay<decltype(x)>::type{}}},
        {"y", Any{std::decay<decltype(y)>::type{}}},
    },
    object(variables_["object"].as<std::decay<decltype(object)>::type>()),
    tile_east(variables_["tileEast"].as<std::decay<decltype(tile_east)>::type>()),
    tile_north(variables_["tileNorth"].as<std::decay<decltype(tile_north)>::type>()),
    tile_south(variables_["tileSouth"].as<std::decay<decltype(tile_south)>::type>()),
    tile_west(variables_["tileWest"].as<std::decay<decltype(tile_west)>::type>()),
    type(variables_["type"].as<std::decay<decltype(type)>::type>()),
    wizard(variables_["wizard"].as<std::decay<decltype(wizard)>::type>()),
    x(variables_["x"].as<std::decay<decltype(x)>::type>()),
    y(variables_["y"].as<std::decay<decltype(y)>::type>())
{
    for(auto&& obj : init)
    {
      variables_.emplace(std::make_pair(std::move(obj.first), std::move(obj.second)));
    }
}

Tile_::~Tile_() = default;

void Tile_::resize(const std::string& name, std::size_t size)
{
    try
    {
        Game_object_::resize(name, size);
        return;
    }
    catch(...){}
    throw Bad_manipulation(name + " in Tile treated as a vector, but it is not a vector.");
}

void Tile_::change_vec_values(const std::string& name, std::vector<std::pair<std::size_t, Any>>& values)
{
    try
    {
        Game_object_::change_vec_values(name, values);
        return;
    }
    catch(...){}
    throw Bad_manipulation(name + " in Tile treated as a vector, but it is not a vector.");
}

void Tile_::remove_key(const std::string& name, Any& key)
{
    try
    {
        Game_object_::remove_key(name, key);
        return;
    }
    catch(...){}
    throw Bad_manipulation(name + " in Tile treated as a map, but it is not a map.");
}

std::unique_ptr<Any> Tile_::add_key_value(const std::string& name, Any& key, Any& value)
{
    try
    {
        return Game_object_::add_key_value(name, key, value);
    }
    catch(...){}
    throw Bad_manipulation(name + " in Tile treated as a map, but it is not a map.");
}

bool Tile_::is_map(const std::string& name)
{
    try
    {
        return Game_object_::is_map(name);
    }
    catch(...){}
    return false;
}

void Tile_::rebind_by_name(Any* to_change, const std::string& member, std::shared_ptr<Base_object> ref)
{
   if(member == "object")
   { 
      to_change->as<Item>() = std::static_pointer_cast<Item_>(ref);
      return;
   }
   if(member == "tileEast")
   { 
      to_change->as<Tile>() = std::static_pointer_cast<Tile_>(ref);
      return;
   }
   if(member == "tileNorth")
   { 
      to_change->as<Tile>() = std::static_pointer_cast<Tile_>(ref);
      return;
   }
   if(member == "tileSouth")
   { 
      to_change->as<Tile>() = std::static_pointer_cast<Tile_>(ref);
      return;
   }
   if(member == "tileWest")
   { 
      to_change->as<Tile>() = std::static_pointer_cast<Tile_>(ref);
      return;
   }
   if(member == "wizard")
   { 
      to_change->as<Wizard>() = std::static_pointer_cast<Wizard_>(ref);
      return;
   }
   try
   {
      Game_object_::rebind_by_name(to_change, member, ref);
      return;
   }
   catch(...){}
   throw Bad_manipulation(member + " in Tile treated as a reference, but it is not a reference.");
}


} // magomachy

} // cpp_client
