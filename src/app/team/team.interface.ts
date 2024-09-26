

export interface ITeam {
  _id?: string;
  name: string;
  role: string;
  facebookLink?: string;
  twitterLink?: string;
  linkedinLink?: string;
  githubLink?: string;
  youtubeLink?: string;
  instagramLink?: string;
  image: {
    url: string;
    public_id: string;
  };
}


