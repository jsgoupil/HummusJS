export let PDFPageModifier: PDFPageModifier;
export let PDFWStreamForFile: PDFWStreamForFile;
export let PDFRStreamForFile: PDFRStreamForFile;

export function createWriter(input: string | WriteStream, options: PDFWriterOptions): PDFWriter;
export function createWriterToModify(inFile: string, options?: PDFWriterToModifyOptions): PDFWriter;
export function createWriterToModify(inStream: PDFRStreamForFile, outStream: PDFWStreamForFile, options?: PDFWriterToModifyOptions): PDFWriter;

export function createWriterToContinue(restartFile: string, restartStateFile: string, options?: PDFWriterToContinueOptions): PDFWriter;
export function createReader(input: string | any, options: PDFReaderOptions): PDFReader; // TODO From stream
export function recrypt(originalPdfPath: string, newPdfPath: string, options?: PDFRecryptOptions): void;
export function recrypt(originalPdfStream: any, newPdfStream: any, options?: PDFRecryptOptions): void; // TODO stream

export interface WriteStream {
    write(inBytesArray: any[]): number;
    getCurrentPosition(): number;
}

// OK1
export interface PDFPageInput {
    /*
	SET_PROTOTYPE_METHOD(t, "getDictionary", GetDictionary);
	SET_PROTOTYPE_METHOD(t, "getMediaBox", GetMediaBox);
	SET_PROTOTYPE_METHOD(t, "getCropBox", GetCropBox);
	SET_PROTOTYPE_METHOD(t, "getTrimBox", GetTrimBox);
	SET_PROTOTYPE_METHOD(t, "getBleedBox", GetBleedBox);
	SET_PROTOTYPE_METHOD(t, "getArtBox", GetArtBox);
	SET_PROTOTYPE_METHOD(t, "getRotate", GetRotate);
    */
}

// OK1
export interface PDFPageModifier {
    new (writer: PDFWriter, pageIndex?: number, ensureContentEncapsulation?: boolean): PDFPageModifier;
    startContext(): this;
    getContext(): XObjectContentContext;
    endContext(): this;
    attachURLLinktoCurrentPage(inUrl: string, left: number, bottom: number, right: number, top: number): this;
    writePage(): this;
}

export interface PDFRStreamForFile {
    new (inPath: string): PDFRStreamForFile;
    read(inAmount: number): number[]; // TODO Confirm?
    notEnded(): boolean;
    setPosition(inPosition: number): void;
    setPositionFromEnd(inPosition: number): void;
    skip(inAmount: number): void;
    getCurrentPosition(): number;
    close(inCallback?: () => void): void;
}

export interface ColorOptions {
    colorspace?: string;
    color?: string | number;
}

export interface GraphicOptions extends ColorOptions {
    type?: 'stroke' | 'fill' | 'clip';
    width?: number;
    close?: boolean;
}

// OK1
export interface AbstractContentContext {
    b(): this;
    B(): this;
    bStar(): this;
    BStar(): this;
    s(): this;
    S(): this;
    f(): this;
    F(): this;
    fStar(): this;
    n(): this;
    m(x: number, y: number): this;
    l(x: number, y: number): this;
    c(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number;
    v(x2: number, y2: number, x3: number, y3: number): this;
    y(x1: number, y1: number, x3: number, y3: number): this;
    h(): this;
    re(left: number, bottom: number, width: number, height: number): this;
    q(): this;
    Q(): this;
    cm(a: number, b: number, c: number, d: number, e: number, f: number): this;
    w(lineWidth: number): this;
    J(lineCapStyle: number): this;
    j(lineJoinStyle: number): this;
    M(miterLimit: number): this;
    d(miterLimit: number[], dashPhase: number): this;
    ri(renderingIntentName: string): this;
    i(flatness: number): this;
    gs(graphicStateName: string): this;
    CS(colorSpaceName: string): this;
    cs(colorSpaceName: string): this;
    SC(...colorComponents: number[]): this;
    SCN(...parameters: any[]): this; // This can't be materialized in TypeScript
    ////SCN(...colorComponents: number[], patternName?: string): this;
    sc(...colorComponents: number[]): this;
    scn(...parameters: any[]): this; // This can't be materialized in TypeScript
    ////scn(...colorComponents: number[], patternName?: string): this;
    G(gray: number): this;
    g(gray: number): this;
    RG(r: number, g: number, b: number): this;
    rg(r: number, g: number, b: number): this;
    K(c: number, m: number, y: number, k: number): this;
    k(c: number, m: number, y: number, k: number): this;
    W(): this;
    WStar(): this;
    doXObject(xObject: string | any): this; // TODO
    Tc(characterSpace: number): this;
    Tw(wordSpace: number): this;
    Tz(horizontalScaling: number): this;
    TL(textLeading: number): this;
    Tr(renderingMode: number): this;
    Ts(fontRise: number): this;
    BT(): this;
    ET(): this;
    Td(tX: number, tY: number): this;
    TD(tX: number, tY: number): this;
    Tm(a: number, b: number, c: number, d: number, e: number, f: number): this;
    TStar(): this;
    Tf(fontReferenced: UsedFont | string, fontSize: number): this;
    Tj(text: string | any): this; // Glyph
    Quote(text: string | any): this; // Glyph
    DoubleQuote(wordSpacing: number, characterString: number, text: string | any): this; // Glyph
    TJ(stringsAndSpacing: any): this; // TODO
    writeFreeCode(freeCode: string): this;
    drawPath(...parameters: any[]): this; // This can't be materialized in TypeScript
    ////drawPath(...xyPairs: number[], options: GraphicOptions): this;
    drawCircle(x: number, y: number, r: number, options: GraphicOptions): this;
    drawSquare(x: number, y: number, l: number, options: GraphicOptions): this;
    drawRectangle(x: number, y: number, w: number, h: number, options: GraphicOptions): this;
    writeText(text: string, x: number, y: number, options?: WriteTextOptions): this;
    drawImage(x: number, y: number, imagePath: string, options?: ImageOptions): this;
}

export interface TransformationObject {
    width: number;
    height: number;
    proportional?: boolean;
    fit?: 'always' | 'overflow';
}

export interface ImageOptions {
    index?: number;
    transformation?: number[] | TransformationObject;
    password?: string;
}

export interface FontOptions {
    size?: number;
    font?: UsedFont;
}

export interface WriteTextOptions extends FontOptions, ColorOptions {
    underline?: boolean;
}

// OK1
export interface XObjectContentContext extends AbstractContentContext {
}


export interface PDFWStreamForFile extends WriteStream {
    new (inPath: string): PDFWStreamForFile;
    close(inCallback?: () => void): void;
}

export interface PDFReaderOptions {
    password?: string;
}

export interface PDFWriterToModifyOptions extends PDFWriterOptions {
    modifiedFilePath?: string;
}

export interface PDFWriterToContinueOptions {
    modifiedFilePath?: string;
    alternativeStream?: any; // TODO
    log?: string;
}

export interface PDFRecryptOptions extends PDFWriterOptions {
    password?: string;
}

export interface PDFWriterOptions {
    version?: number;
    log?: string;
    compress?: boolean;

    userPassword?: string;
    ownerPassword?: string;
    userProtectionFlag?: number;
}

export interface ResourcesDictionary {
    /*
	SET_PROTOTYPE_METHOD(t, "addFormXObjectMapping", AddFormXObjectMapping);
	SET_PROTOTYPE_METHOD(t, "addImageXObjectMapping", AddImageXObjectMapping);
	SET_PROTOTYPE_METHOD(t, "addProcsetResource", AddProcsetResource);
	SET_PROTOTYPE_METHOD(t, "addExtGStateMapping", AddExtGStateMapping);
	SET_PROTOTYPE_METHOD(t, "addFontMapping", AddFontMapping);
	SET_PROTOTYPE_METHOD(t, "addColorSpaceMapping", AddColorSpaceMapping);
	SET_PROTOTYPE_METHOD(t, "addPatternMapping", AddPatternMapping);
	SET_PROTOTYPE_METHOD(t, "addPropertyMapping", AddPropertyMapping);
	SET_PROTOTYPE_METHOD(t, "addXObjectMapping", AddXObjectMapping);
	SET_PROTOTYPE_METHOD(t, "addShadingMapping", AddShadingMapping);
    */
}

// OK1
export interface PDFPage {
    mediaBox?: number[];
    cropBox?: number[];
    bleedBox?: number[];
    trimBox?: number[];
    artBox?: number[];
    rotate?: number;
    getResourcesDictionary(): ResourcesDictionary;


    /*
    SET_ACCESSOR_METHODS(t, "mediaBox", GetMediaBox, SetMediaBox);
	SET_ACCESSOR_METHODS(t, "cropBox", GetCropBox, SetCropBox);
	SET_ACCESSOR_METHODS(t, "bleedBox", GetBleedBox, SetBleedBox);
	SET_ACCESSOR_METHODS(t, "trimBox", GetTrimBox, SetTrimBox);
	SET_ACCESSOR_METHODS(t, "artBox", GetArtBox, SetArtBox);
    SET_ACCESSOR_METHODS(t, "rotate",GetRotate, SetRotate);
	SET_PROTOTYPE_METHOD(t, "getResourcesDictionary", GetResourcesDictionary);
    */
}

export interface TextDimension {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
    width: number;
    height: number;
}

// OK1
export interface UsedFont {
    calculateTextDimensions(text: string | any, fontSize: number): TextDimension;
}

// OK1
export interface ByteWriter {
    write(buffer: number[]): number;
}

// OK1
export interface ByteReader {
    /*
	SET_PROTOTYPE_METHOD(t, "read", Read);
	SET_PROTOTYPE_METHOD(t, "notEnded", NotEnded);
    */
}

// OK1
export interface ByteReaderWithPosition {
    /*
        SET_PROTOTYPE_METHOD(t, "read", Read);
        SET_PROTOTYPE_METHOD(t, "notEnded", NotEnded);
        SET_PROTOTYPE_METHOD(t, "setPosition", SetPosition);
        SET_PROTOTYPE_METHOD(t, "getCurrentPosition", GetCurrentPosition);
        SET_PROTOTYPE_METHOD(t, "setPositionFromEnd", SetPositionFromEnd);
        SET_PROTOTYPE_METHOD(t, "skip", Skip);
        */
}

// OK1
export interface PDFReader {
    /*
    	SET_PROTOTYPE_METHOD(t, "getPDFLevel", GetPDFLevel);
	SET_PROTOTYPE_METHOD(t, "getPagesCount", GetPagesCount);
	SET_PROTOTYPE_METHOD(t, "getTrailer", GetTrailer);
	SET_PROTOTYPE_METHOD(t, "queryDictionaryObject", QueryDictionaryObject);
	SET_PROTOTYPE_METHOD(t, "queryArrayObject", QueryArrayObject);
	SET_PROTOTYPE_METHOD(t, "parseNewObject", ParseNewObject);
	SET_PROTOTYPE_METHOD(t, "getPageObjectID", GetPageObjectID);
	SET_PROTOTYPE_METHOD(t, "parsePageDictionary", ParsePageDictionary);
	SET_PROTOTYPE_METHOD(t, "parsePage", ParsePage);
	SET_PROTOTYPE_METHOD(t, "getObjectsCount", GetObjectsCount);
	SET_PROTOTYPE_METHOD(t, "isEncrypted", IsEncrypted);
	SET_PROTOTYPE_METHOD(t, "getXrefSize", GetXrefSize);
	SET_PROTOTYPE_METHOD(t, "getXrefEntry", GetXrefEntry);
	SET_PROTOTYPE_METHOD(t, "getXrefPosition", GetXrefPosition);
	SET_PROTOTYPE_METHOD(t, "startReadingFromStream", StartReadingFromStream);
	SET_PROTOTYPE_METHOD(t, "getParserStream", GetParserStream);
    */
}

// OK1
export interface PDFStream {
    getWriteStream(): ByteWriter;
}

// OK1
export interface PDFNull extends PDFObject {
    /*
        SET_ACCESSOR_METHOD(t, "value", GetValue);
        */
}

// OK1
export interface PDFName extends PDFObject {
    /*
        SET_ACCESSOR_METHOD(t, "value", GetValue);
        */
}

// OK1
export interface PDFLiberalString extends PDFObject {
    /*
        SET_PROTOTYPE_METHOD(t, "toText", ToText);
        SET_ACCESSOR_METHOD(t, "value", GetValue);
        */
}

// OK1
export interface PDFInteger extends PDFObject {
    /*
        SET_ACCESSOR_METHOD(t, "value", GetValue);
        */
}

// OK1
export interface PDFIndirectObjectReference extends PDFObject {
    /*
        SET_PROTOTYPE_METHOD(t, "getObjectID", GetObjectID);
        SET_PROTOTYPE_METHOD(t, "getVersion", GetVersion);
        */
}

// OK1
export interface PDFHexString extends PDFObject {
    /*
        SET_ACCESSOR_METHOD(t, "value", GetValue);
        */
}

// OK1
export interface PDFDictionary extends PDFObject {
    /*
        SET_PROTOTYPE_METHOD(t, "toJSObject", ToJSObject);
        SET_PROTOTYPE_METHOD(t, "queryObject", QueryObject);
        SET_PROTOTYPE_METHOD(t, "exists", Exists);
        */
}

// OK1
export interface PDFDate {
    /*
        SET_PROTOTYPE_METHOD(t, "toString", ToString);
        SET_PROTOTYPE_METHOD(t, "setToCurrentTime", SetToCurrentTime);
        */
}

// OK1
export interface PDFBoolean extends PDFObject {
    /*
	SET_ACCESSOR_METHOD(t, "value", GetValue);
    */
}

// OK1
export interface PDFArray extends PDFObject {
    /*
	SET_PROTOTYPE_METHOD(t, "toJSArray", ToJSArray);
	SET_PROTOTYPE_METHOD(t, "queryObject", QueryObject);
	SET_PROTOTYPE_METHOD(t, "getLength", GetLength);
    */
}

// OK1
export interface OutputFile {
    /*
	SET_PROTOTYPE_METHOD(t, "openFile", OpenFile);
	SET_PROTOTYPE_METHOD(t, "closeFile", CloseFile);
	SET_PROTOTYPE_METHOD(t, "getFilePath", GetFilePath);
	SET_PROTOTYPE_METHOD(t, "getOutputStream", GetOutputStream);
    */
}

// OK1
export interface InputFile {
    /*
        SET_PROTOTYPE_METHOD(t, "openFile", OpenFile);
        SET_PROTOTYPE_METHOD(t, "closeFile", CloseFile);
        SET_PROTOTYPE_METHOD(t, "getFilePath", GetFilePath);
        SET_PROTOTYPE_METHOD(t, "getFileSize", GetFileSize);
        SET_PROTOTYPE_METHOD(t, "getInputStream", GetInputStream);
    */
}

export interface InfoDictionary {
    /*
	SET_PROTOTYPE_METHOD(t, "addAdditionalInfoEntry", AddAdditionalInfoEntry);
	SET_PROTOTYPE_METHOD(t, "removeAdditionalInfoEntry", RemoveAdditionalInfoEntry);
	SET_PROTOTYPE_METHOD(t, "clearAdditionalInfoEntries", ClearAdditionalInfoEntries);
	SET_PROTOTYPE_METHOD(t, "getAdditionalInfoEntry", GetAdditionalInfoEntry);
	SET_PROTOTYPE_METHOD(t, "getAdditionalInfoEntries", GetAdditionalInfoEntries);
	SET_PROTOTYPE_METHOD(t, "setCreationDate", SetCreationDate);
	SET_PROTOTYPE_METHOD(t, "setModDate", SetModDate);
	SET_ACCESSOR_METHODS(t, "title", GetTitle, SetTitle);
	SET_ACCESSOR_METHODS(t, "author", GetAuthor, SetAuthor);
	SET_ACCESSOR_METHODS(t, "subject", GetSubject, SetSubject);
	SET_ACCESSOR_METHODS(t, "keywords", GetKeywords, SetKeywords);
	SET_ACCESSOR_METHODS(t, "creator", GetCreator, SetCreator);
	SET_ACCESSOR_METHODS(t, "producer", GetProducer, SetProducer);
	SET_ACCESSOR_METHODS(t, "trapped", GetTrapped, SetTrapped);
    */
}

// OK1
export interface ImageXObject {
    /*
        SET_ACCESSOR_METHOD(t, "id", GetID);
        */
}

// OK1
export interface FormObject {
    /*
        SET_ACCESSOR_METHOD(t,"id", GetID);
        SET_PROTOTYPE_METHOD(t, "getContentContext", GetContentContext);
        SET_PROTOTYPE_METHOD(t, "getResourcesDictinary", GetResourcesDictionary);
        SET_PROTOTYPE_METHOD(t, "getContentStream", GetContentStream);
        */
}

export interface DocumentCopyingContext {
    /*
	SET_PROTOTYPE_METHOD(t, "createFormXObjectFromPDFPage", CreateFormXObjectFromPDFPage);
	SET_PROTOTYPE_METHOD(t, "mergePDFPageToPage", MergePDFPageToPage);
	SET_PROTOTYPE_METHOD(t, "appendPDFPageFromPDF", AppendPDFPageFromPDF);
	SET_PROTOTYPE_METHOD(t, "mergePDFPageToFormXObject", MergePDFPageToFormXObject);
	SET_PROTOTYPE_METHOD(t, "getSourceDocumentParser", GetSourceDocumentParser);
	SET_PROTOTYPE_METHOD(t, "copyDirectObjectAsIs", CopyDirectObjectAsIs);
	SET_PROTOTYPE_METHOD(t, "copyObject", CopyObject);
	SET_PROTOTYPE_METHOD(t, "copyDirectObjectWithDeepCopy", CopyDirectObjectWithDeepCopy);
	SET_PROTOTYPE_METHOD(t, "copyNewObjectsForDirectObject", CopyNewObjectsForDirectObject);
	SET_PROTOTYPE_METHOD(t, "getCopiedObjectID", GetCopiedObjectID);
	SET_PROTOTYPE_METHOD(t, "getCopiedObjects", GetCopiedObjects);
	SET_PROTOTYPE_METHOD(t, "replaceSourceObjects", ReplaceSourceObjects);
	SET_PROTOTYPE_METHOD(t, "getSourceDocumentStream", GetSourceDocumentStream);
    */
}

// OK1
export interface DocumentContext {
    /*
	SET_PROTOTYPE_METHOD(t, "getInfoDictionary", GetInfoDictionary);
    */
}

// OK1
export interface DictionaryContext {
    /*
        SET_PROTOTYPE_METHOD(t, "writeKey", WriteKey);
        SET_PROTOTYPE_METHOD(t, "writeNameValue", WriteNameValue);
        SET_PROTOTYPE_METHOD(t, "writeRectangleValue", WriteRectangleValue);
        SET_PROTOTYPE_METHOD(t, "writeLiteralStringValue", WriteLiteralStringValue);
        SET_PROTOTYPE_METHOD(t, "writeBooleanValue", WriteBooleanValue);
        SET_PROTOTYPE_METHOD(t, "writeObjectReferenceValue", WriteObjectReferenceValue);
        */
}

// OK1
export interface ByteWriterWithPosition {
    /*
        SET_PROTOTYPE_METHOD(t, "write", Write);
        SET_PROTOTYPE_METHOD(t, "getCurrentPosition", GetCurrentPosition);
        */
}

// OK1
export interface ObjectsContext {
    /*
SET_PROTOTYPE_METHOD(t, "allocateNewObjectID", AllocateNewObjectID);
	SET_PROTOTYPE_METHOD(t, "startDictionary", StartDictionary);
	SET_PROTOTYPE_METHOD(t, "startArray", StartArray);
	SET_PROTOTYPE_METHOD(t, "writeNumber", WriteNumber);
	SET_PROTOTYPE_METHOD(t, "endArray", EndArray);
	SET_PROTOTYPE_METHOD(t, "endLine", EndLine);
	SET_PROTOTYPE_METHOD(t, "endDictionary", EndDictionary);
	SET_PROTOTYPE_METHOD(t, "endIndirectObject", EndIndirectObject);
	SET_PROTOTYPE_METHOD(t, "writeIndirectObjectReference", WriteIndirectObjectReference);
	SET_PROTOTYPE_METHOD(t, "startNewIndirectObject", StartNewIndirectObject);
	SET_PROTOTYPE_METHOD(t, "startModifiedIndirectObject", StartModifiedIndirectObject);
	SET_PROTOTYPE_METHOD(t, "deleteObject", DeleteObject);
	SET_PROTOTYPE_METHOD(t, "writeName", WriteName);
	SET_PROTOTYPE_METHOD(t, "writeLiteralString", WriteLiteralString);
	SET_PROTOTYPE_METHOD(t, "writeHexString", WriteHexString);
	SET_PROTOTYPE_METHOD(t, "writeBoolean", WriteBoolean);
	SET_PROTOTYPE_METHOD(t, "writeKeyword", WriteKeyword);
	SET_PROTOTYPE_METHOD(t, "writeComment", WriteComment);
	SET_PROTOTYPE_METHOD(t, "setCompressStreams", SetCompressStreams);
	SET_PROTOTYPE_METHOD(t, "startPDFStream", StartPDFStream);
	SET_PROTOTYPE_METHOD(t, "startUnfilteredPDFStream", StartUnfilteredPDFStream);
	SET_PROTOTYPE_METHOD(t, "endPDFStream", EndPDFStream);
	SET_PROTOTYPE_METHOD(t, "startFreeContext", StartFreeContext);
	SET_PROTOTYPE_METHOD(t, "endFreeContext", EndFreeContext);
    */
}

// OK1
export interface PDFObject {
    /*
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "getType", GetType);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toPDFIndirectObjectReference", ToPDFIndirectObjectReference);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toPDFArray", ToPDFArray);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toPDFDictionary", ToPDFDictionary);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toPDFStream", ToPDFStream);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toPDFBoolean", ToPDFBoolean);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toPDFLiteralString", ToPDFLiteralString);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toPDFHexString", ToPDFHexString);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toPDFNull", ToPDFNull);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toPDFName", ToPDFName);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toPDFInteger", ToPDFInteger);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toPDFReal", ToPDFReal);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toPDFSymbol", ToPDFSymbol);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toNumber", ToNumber);
        SET_PROTOTYPE_METHOD(ioDriverTemplate, "toString", ToString);
    */
}

// OK1
export interface PDFReal extends PDFObject {
    /*
        SET_ACCESSOR_METHOD(t, "value", GetValue);
        */
}

// OK1
export interface PDFSymbol extends PDFObject {
    /*
        SET_ACCESSOR_METHOD(t, "value", GetValue);
        */
}

// OK1
export interface PDFStreamInput extends PDFObject {
    /*
	SET_PROTOTYPE_METHOD(t, "getDictionary", GetDictionary);
	SET_PROTOTYPE_METHOD(t, "getStreamContentStart", GetStreamContentStart);
    */
}

// OK1
export interface PDFTextString {
    /*
    SET_PROTOTYPE_METHOD(t, "toBytesArray", ToBytesArray);
	SET_PROTOTYPE_METHOD(t, "toString", ToString);
	SET_PROTOTYPE_METHOD(t, "fromString", FromString);
    */
}

// OK1
export interface PageContentContext extends AbstractContentContext {
    getCurrentPageContentStream(): PDFStream;
    getAssociatedPage(): PDFPage;
}

// OK1
export interface PDFWriter {
    end(): PDFWriter;
    createPage(): PDFPage;
    createPage(x: number, y: number, width: number, height: number): PDFPage;
    writePage(page: PDFPage): this;
    writePageAndReturnID(page: PDFPage): number;
    startPageContentContext(page: PDFPage): PageContentContext;
    pausePageContentContext(pageContextContext: PageContentContext): this;
    /*
    
    
    
    createFormXObject();
    endFormXObject();
    createFormXObjectFromJPG();
    */
    getFontForFile(inFontFilePath: string, index?: number): UsedFont;
    getFontForFile(inFontFilePath: string, inOptionalMetricsFile?: string, index?: number): UsedFont;
    /*
    attachURLLinktoCurrentPage();
    shutdown();
    createFormXObjectFromTIFF();
    createImageXObjectFromJPG();
    retrieveJPGImageInformation();
    getObjectsContext();
    getDocumentContext();
    appendPDFPagesFromPDF();
    mergePDFPagesToPage();
    createPDFCopyingContext();
    createFormXObjectsFromPDF();
    createPDFCopyingContextForModifiedFile();
    createPDFTextString();
    createPDFDate();
    getImageDimensions();
    getImagePagesCount();
    getImageType();
    getModifiedFileParser();
    getModifiedInputFile();
    getOutputFile();
    registerAnnotationReferenceForNextPageWrite();
    */
}