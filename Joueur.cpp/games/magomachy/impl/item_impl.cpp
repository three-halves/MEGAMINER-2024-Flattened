// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify its member variables.
// This contains implementation details, written by code, and only useful to code



#include "../item.hpp"
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


Item_::Item_(std::initializer_list<std::pair<std::string, Any&&>> init) :
    Game_object_{
        {"form", Any{std::decay<decltype(form)>::type{}}},
        {"lifetime", Any{std::decay<decltype(lifetime)>::type{}}},
        {"tile", Any{std::decay<decltype(tile)>::type{}}},
    },
    form(variables_["form"].as<std::decay<decltype(form)>::type>()),
    lifetime(variables_["lifetime"].as<std::decay<decltype(lifetime)>::type>()),
    tile(variables_["tile"].as<std::decay<decltype(tile)>::type>())
{
    for(auto&& obj : init)
    {
      variables_.emplace(std::make_pair(std::move(obj.first), std::move(obj.second)));
    }
}

Item_::~Item_() = default;

void Item_::resize(const std::string& name, std::size_t size)
{
    try
    {
        Game_object_::resize(name, size);
        return;
    }
    catch(...){}
    throw Bad_manipulation(name + " in Item treated as a vector, but it is not a vector.");
}

void Item_::change_vec_values(const std::string& name, std::vector<std::pair<std::size_t, Any>>& values)
{
    try
    {
        Game_object_::change_vec_values(name, values);
        return;
    }
    catch(...){}
    throw Bad_manipulation(name + " in Item treated as a vector, but it is not a vector.");
}

void Item_::remove_key(const std::string& name, Any& key)
{
    try
    {
        Game_object_::remove_key(name, key);
        return;
    }
    catch(...){}
    throw Bad_manipulation(name + " in Item treated as a map, but it is not a map.");
}

std::unique_ptr<Any> Item_::add_key_value(const std::string& name, Any& key, Any& value)
{
    try
    {
        return Game_object_::add_key_value(name, key, value);
    }
    catch(...){}
    throw Bad_manipulation(name + " in Item treated as a map, but it is not a map.");
}

bool Item_::is_map(const std::string& name)
{
    try
    {
        return Game_object_::is_map(name);
    }
    catch(...){}
    return false;
}

void Item_::rebind_by_name(Any* to_change, const std::string& member, std::shared_ptr<Base_object> ref)
{
   if(member == "tile")
   { 
      to_change->as<Item>() = std::static_pointer_cast<Item_>(ref);
      return;
   }
   try
   {
      Game_object_::rebind_by_name(to_change, member, ref);
      return;
   }
   catch(...){}
   throw Bad_manipulation(member + " in Item treated as a reference, but it is not a reference.");
}


} // magomachy

} // cpp_client
