export default (req, res, next) => {
  if (req.query?.page) {
    const pageNumber = req.query.page;
    const pageSize = 20;
    req.paginate = { skip: (pageNumber - 1) * pageSize, take: pageSize };
  } else {
    req.paginate = {};
  }
  next();
};
