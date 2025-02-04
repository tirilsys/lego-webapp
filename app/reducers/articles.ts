import { orderBy } from 'lodash';
import { createSelector } from 'reselect';
import { mutateComments } from 'app/reducers/comments';
import { mutateReactions } from 'app/reducers/reactions';
import { typeable } from 'app/reducers/utils';
import type { UnknownArticle } from 'app/store/models/Article';
import createEntityReducer from 'app/utils/createEntityReducer';
import joinReducers from 'app/utils/joinReducers';
import { Article } from '../actions/ActionTypes';

export default createEntityReducer({
  key: 'articles',
  types: {
    fetch: Article.FETCH,
    mutate: Article.CREATE,
    delete: Article.DELETE,
  },
  mutate: joinReducers(mutateComments('articles'), mutateReactions('articles')),
});

function transformArticle(article) {
  return { ...article };
}

export const selectArticles = typeable(
  createSelector(
    (state) => state.articles.byId,
    (state) => state.articles.items,
    (_, props) => props && props.pagination,
    (articlesById, articleIds, pagination) =>
      orderBy<UnknownArticle>(
        (pagination ? pagination.items : articleIds).map((id) =>
          transformArticle(articlesById[id])
        ) as ReadonlyArray<UnknownArticle>,
        ['createdAt', 'id'],
        ['desc', 'desc']
      )
  )
);
export const selectArticlesByTag = createSelector(
  selectArticles,
  (state, props) => props.tag,
  (articles, tag) =>
    articles.filter((article) =>
      tag ? article.tags.indexOf(tag) !== -1 : true
    )
);
export const selectArticleById = createSelector(
  (state) => state.articles.byId,
  (state, props) => props.articleId,
  (articlesById, articleId) => transformArticle(articlesById[articleId])
);
export const selectCommentsForArticle = createSelector(
  selectArticleById,
  (state) => state.comments.byId,
  (article, commentsById) => {
    if (!article) return [];
    return (article.comments || []).map((commentId) => commentsById[commentId]);
  }
);
export const selectReactionsForArticle = createSelector(
  selectArticleById,
  (state) => state.reactions.byId,
  (article, reactionsById) => {
    if (!article) return [];
    return (article.reactionsGrouped || []).map(
      (reactionId) => reactionsById[reactionId]
    );
  }
);
