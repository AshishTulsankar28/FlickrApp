
export interface FlickerResp {

  photos:{page:number,perpage:number,pages:number,photo:photo[],total:number};
  stat: String;

}

export interface photo{
dateupload:number,
farm: number,
has_comment: number,
id: String,
is_primary: number,
isfamily: number,
isfriend: number,
ispublic: number,
owner:  String,
secret: String,
server: String,
title:  String,
imgUrl: String,
uploadDate:string
rating:number,
comment:string,
commentBy:string
}