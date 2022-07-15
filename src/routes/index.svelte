<h1>Blob fetch undici bug</h1>
<p>
	Select an image and upload, observe the error "Blob: Expected [object Blob] to be an instance of
	Blob."
</p>
<form action="/?_method=PATCH" method="POST">
	<input type="file" name="file" />
	<input type="text" name="text" value="Some text" />
	<button>Upload</button>
</form>
