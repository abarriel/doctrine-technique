import _ from 'lodash';
import { recipes, ingredients } from '../data';

const getRessources = async (req, res, next) => {
  try {
    res.json({ ingredients });
  } catch (err) {
    next({ details: 'Failed to fetch data', status: 404 });
  }
};

const getRecipe = (recipes, IngredientsAsked) =>
  _.reduce(recipes, (res, { ingredients }, key) =>
    _.isEqual(ingredients.sort(), IngredientsAsked) ? key : res, '');

const mixIngredients = async (req, res, next) => {
  const { ingredients: ingredientsAsked } = req.body;
  if (!_.isObject(ingredientsAsked) || ingredientsAsked.length !== 3)
    return next({ details: 'must have 3 ingredients: IngredientsAsked', status: 400 });

  _.forEach(ingredientsAsked, (ingredient) => {
    if (_.isEmpty(ingredients[ingredient]))
      return next({ details: `the ingredient ${ingredient} must be present`, status: 400 });
    if (ingredients[ingredient].quantity <= 0)
      return next({ details: `the ingredient ${ingredient} must be available`, status: 400 });
    ingredients[ingredient].quantity -= 1;
  });

  const mixture = getRecipe(recipes, ingredientsAsked.sort());
  if (_.isEmpty(mixture))
    return next({ details: 'no recipe found', status: 400 });
  res.json({ mixture });
};

export {
  getRessources,
  mixIngredients,
};
