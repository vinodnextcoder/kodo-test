export class HelperUtil {
  /**
   * 
   * @param items pagination function
   * @param current_page 
   * @param per_page_items 
   * @returns 
   */
  static async paginator(items: any, current_page: any, per_page_items: any) {
    let page = current_page || 1,
      per_page = per_page_items || 10,
      offset = (page - 1) * per_page,

      paginatedItems = items.slice(offset).slice(0, per_page_items),
      total_pages = Math.ceil(items.length / per_page);

    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: (total_pages > page) ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems
    };
  }
  /**
   *
   * @param searchQuery 
   * @param array 
   * @param objectKey 
   * @param exactMatch 
   * @param pageNo 
   * @returns array of object data pages info
   */
  static async searchInArray(searchQuery: any, array: any, objectKey: any, exactMatch: any, pageNo:any) {
    let searchResult = [];
    if (exactMatch === 'Yes') {
      searchResult = array.filter(obj => obj.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      searchResult = array.filter(d => {
        let data = objectKey ? d[objectKey] : d 
        let dataWords = typeof data == "string" && data?.split(" ")?.map(b => b && b.toLowerCase().trim()).filter(b => b)
        let searchWords = typeof searchQuery == "string" && searchQuery?.split(" ").map(b => b && b.toLowerCase().trim()).filter(b => b)
        let matchingWords = searchWords.filter(word => dataWords.includes(word));
        return matchingWords.length;
      });
    }
    let paginate = await HelperUtil.paginator(searchResult, pageNo, 10);
    return paginate;
  }

}
