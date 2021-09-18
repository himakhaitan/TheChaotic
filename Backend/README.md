---
description: The Chaotic Backend Build
---

# API Docs

### CONFIGURATION

PORT by Default : 8000

Base URL : http://localhost:8000
<br>

### ENDPOINT REFERENCE

<table>
 <thead>
    <tr>
      <th style="text-align:left">Endpoint</th>
      <th style="text-align:left">Method</th>
      <th style="text-align:left">Access</th>
      <th style="text-align:left">Request</th>
      <th style="text-align:left">Response</th>
    </tr>
  </thead>
<tbody>
<tr>
      <td style="text-align:left">/</td>
      <td style="text-align:left">GET</td>
      <td style="text-align:left">Public</td>
      <td style="text-align:left">none</td>
      <td style="text-align:left">
        <p>{</p>
        <p>status: &quot;online&quot;,</p>
        <p>host: &quot;localhost:8000&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/connect/newsletter/join</td>
      <td style="text-align:left">POST</td>
       <td style="text-align:left">Public</td>
      <td style="text-align:left">
        <p>{</p>
        <p>email: &quot;String&quot;,</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>success: &quot;Boolean&quot;,</p>
        <p>message: &quot;String&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/connect/form/submit</td>
      <td style="text-align:left">POST</td>
       <td style="text-align:left">Public</td>
      <td style="text-align:left">
        <p>{</p>
        <p>name: &quot;String&quot;,</p>
        <p>email: &quot;String&quot;,</p>
        <p>message: &quot;String&quot;,</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>success: &quot;Boolean&quot;,</p>
        <p>message: &quot;String&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/blog/post/new</td>
      <td style="text-align:left">POST</td>
       <td style="text-align:left">Private</td>
      <td style="text-align:left">
        <p>{</p>
        <p>BlogImage: &quot;Image&quot;,</p>
        <p>title: &quot;String&quot;,</p>
        <p>content: &quot;String&quot;,</p>
        <p>author: &quot;Object ID&quot;,</p>
        <p>category: &quot;Object ID&quot;,</p>
        <p>tags: &quot;String&quot;,</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>success: &quot;Boolean&quot;,</p>
        <p>message: &quot;String&quot;</p>
         <p>blog: &quot;Object&quot;</p>
        <p>}</p>
      </td>
    </tr>
     <tr>
      <td style="text-align:left">/blog/post/:id</td>
      <td style="text-align:left">GET</td>
       <td style="text-align:left">Public</td>
      <td style="text-align:left">
       none
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>success: &quot;Boolean&quot;,</p>
        <p>message: &quot;String&quot;</p>
         <p>blog: &quot;Object&quot;</p>
        <p>}</p>
      </td>
    </tr>
      <tr>
      <td style="text-align:left">/assist/author/create</td>
      <td style="text-align:left">POST</td>
       <td style="text-align:left">Private</td>
      <td style="text-align:left">
        <p>{</p>
        <p>name: &quot;String&quot;,</p>
        <p>desc: &quot;String&quot;,</p>
        <p>profileImg: &quot;Image&quot;,</p>
        <p>socials: {,</p>
        <p>&nbsp;instgram: &quot;String(url)&quot;,</p>
        <p>&nbsp;linkedin: &quot;String(url)&quot;,</p>
        <p>&nbsp;github: &quot;String(url)&quot;,</p>
        <p>&nbsp;facebook: &quot;String(url)&quot;,</p>
        <p>}</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>success: &quot;Boolean&quot;,</p>
        <p>message: &quot;String&quot;</p>
         <p>author: &quot;Object&quot;</p>
        <p>}</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">/assist/category/create</td>
      <td style="text-align:left">POST</td>
       <td style="text-align:left">Private</td>
      <td style="text-align:left">
        <p>{</p>
        <p>name: &quot;String&quot;,</p>
        <p>desc: &quot;String&quot;,</p>
        <p>}</p>
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>success: &quot;Boolean&quot;,</p>
        <p>message: &quot;String&quot;</p>
         <p>category: &quot;Object&quot;</p>
        <p>}</p>
      </td>
    </tr>
     <tr>
      <td style="text-align:left">/blog/all</td>
      <td style="text-align:left">all</td>
       <td style="text-align:left">Public</td>
      <td style="text-align:left">
       none
      </td>
      <td style="text-align:left">
        <p>{</p>
        <p>success: &quot;Boolean&quot;,</p>
        <p>message: &quot;String&quot;</p>
         <p>blogs: &quot;Object&quot;</p>
        <p>}</p>
      </td>
    </tr>
</tbody>
</table>
