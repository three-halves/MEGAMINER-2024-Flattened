// DO NOT MODIFY THIS FILE
// Never try to directly create an instance of this class, or modify its member variables.
// This contains implementation details, written by code, and only useful to code

#ifndef GAMES_MAGOMACHY_HPP
#define GAMES_MAGOMACHY_HPP

#include "../../../joueur/src/base_game.hpp"
#include "../ai.hpp"
#include "../../../joueur/src/any.hpp"

// This feels bad, but it should work
#include "../game.hpp"

/// \cond FALSE

namespace cpp_client
{

namespace magomachy
{

class Magomachy : public Game_
{
public:
    Magomachy() :
        Game_{}
    {
        instance(this);
    }
    virtual std::string get_game_name() const noexcept override { return "Magomachy"; }
    virtual std::unique_ptr<Base_ai> generate_ai() override;
    virtual std::shared_ptr<Base_object> generate_object(const std::string& type) override;
    virtual std::unordered_map<std::string, std::shared_ptr<Base_object>>& get_objects() override
    {
        return variables_["gameObjects"].as<std::unordered_map<std::string, std::shared_ptr<Base_object>>>();
    }

    //this is kind of a messy way of handling this - but it's probably the best that
    //can be done
    static Base_game* instance(Base_game* init = nullptr)
    {
        static Base_game* the_game = init;
        if(!the_game)
        {
            throw Unknown_error("Magomachy instance is nullptr(??\?)");
        }
        else if(the_game && init && the_game != init)
        {
            throw Unknown_error("Magomachy created twice(??\?)");
        }
        return the_game;
    }
};

} // magomachy

} // cpp_client

/// \endcond

#endif // GAMES_MAGOMACHY_HPP
