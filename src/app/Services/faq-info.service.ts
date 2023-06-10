import { Injectable } from '@angular/core';

export interface info {
  header : string;
  content : string | string[];
}

@Injectable({
  providedIn: 'root'
})
export class FaqInfoService {
  constructor() { }

  informationToDisplay : info[] = [
    {header : "What is a Summarizer?", 
      content : "A text summarizer is an online tool that uses AI and complex algorithms to condense a text from its long, detailed version to one that is short and comprehensible. A summarizer tool carries all of the key points in a text over to the condensed version. The content you receive contains a complete overview of the text. For example, pasting 2000 words worth of content into the summarizer can result in a more digestible 200-word version, eliminating nearly ¾ of the text."
    },
    {
      header : "What can I summarize?",
      content : ["Youtube Videos", "Essays", "Letters", "Documents", "Articles", "Research Papers", "Text", "Writing"]
    },
    {
      header : "How does it work?",
      content : "Our website utilizes AI algorithms to convert speech into text, along with summarizing the text. the AI 'understands' the context of the text/video using state-of-the-art AI models trained on a variety of custom datasets ranging from news articles and essays to scientific papers to even conversations. This enables the AI to better understand the meaning behind a text and break it down into a condensed version."
    }
  ]
}
