import excel from "exceljs";

export const download = async (ctx) => {

    const objs = [{
        id : "테스트",
        title : "타이틀입니다",
        description : "설명",
        published : "날짜"
    }];

    let tutorials = [];
    objs.forEach((obj) => {
      tutorials.push({
        id: obj.id,
        title: obj.title,
        description: obj.description,
        published: obj.published,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Tutorials");
    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "Title", key: "title", width: 25 },
      { header: "Description", key: "description", width: 25 },
      { header: "Published", key: "published", width: 10 },
    ];
    // Add Array Rows
    worksheet.addRows(tutorials);
    // res is a Stream object   
    try {
        ctx.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        ctx.status = 200;
        await workbook.xlsx.write(ctx.res).then(()=>{
            ctx.res.end();
        });
      } catch (error) {
        ctx.throw(500, error);
      }

}

